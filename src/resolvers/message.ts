import { Chat, Message } from '../models'
import { PubSub, ApolloError, IResolvers, UserInputError } from 'apollo-server-express'
import { withFilter } from 'graphql-subscriptions'
import { UserDocument, MessageDocument } from '../types'

const pubsub = new PubSub()

const MESSAGE_SUBSCRIPTIONS = {
  ADD: 'MESSAGE_ADDED',
  UPDATE: 'MESSAGE_UPDATED',
  DELETE: 'MESSAGE_DELETED'
}

const MessageResolve: IResolvers = {
  Query: {
    getMessages: async (
      root,
      { chatId, limit, fromMessage }:
        { chatId: string, limit: number, fromMessage: string },
      { user }: { user: string }
    ) => {
      const chat = (await Chat.findChat({ _id: chatId }))
        .userInMembers(user)

      const getOffset = async () => {
        const messages = await Message.find({ chatId })
          .sort({ createdAt: -1 })

        const idx = messages.findIndex((message: MessageDocument) => message._id.toString() === fromMessage)

        if (idx === -1) throw new ApolloError("")

        return idx + 1
      }

      const offset = fromMessage ? await getOffset() : 0

      const messages = await Message.find({ chatId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset)

      return messages.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
    },
  },
  Mutation: {
    sendMessage: async (root, args: any, { user }: { user: string }) => {
      const message = await Message.create({
        ...args,
        sender: user,
        viewedBy: [user]
      })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.ADD, { type: 'ADD', message })

      return message
    },
    deleteMessage: async (root, { id }: { id: string }, { user }: { user: string }) => {
      const message = (await Message.findMessage({ _id: id }))
        .haveSenderAllow(user)

      await Message.deleteOne({ _id: id })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.DELETE, { type: 'DELETE', message })

      return message
    },
    updateMessage: async (
      root,
      { id, body }:
        { id: string, body: string },
      { user }: { user: string }
    ) => {
      const message = (await Message.findMessage({ _id: id })).haveSenderAllow(user)

      const updatedMessage = await Message.findByIdAndUpdate(id, { body }, { new: true })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.UPDATE, { type: 'UPDATE', message })

      return updatedMessage
    },
    markAsRead: async (
      root,
      { messageId }: { messageId: string },
      { user }: { user: string }
    ) => {
      await Message.updateOne({ _id: messageId }, { $push: { viewedBy: user } })

      return true
    }
  },
  Message: {
    sender: async (message: MessageDocument) =>
      (await message.populate('sender').execPopulate()).sender,
    isViewed: (
      { viewedBy }: MessageDocument,
      _,
      { user }: { user: string }
    ) => viewedBy.includes(user)
  },
  Subscription: {
    messageObserver: {
      resolve: (payload) => payload,
      subscribe: withFilter((
        root,
        { types }: { types: (keyof typeof MESSAGE_SUBSCRIPTIONS)[] }
      ) => {
        const subscriptions = types.map(type => MESSAGE_SUBSCRIPTIONS[type])

        return pubsub.asyncIterator(subscriptions)
      },
        async (
          { message }: { message: MessageDocument },
          _,
          { user }: { user: string }
        ) => {
          const { members } = await Chat.findChat({ _id: message.chatId })
          const isMember = members.some(member => member.toString() === user)

          const { sender } = await message.populate('sender').execPopulate()

          const notSender = sender.id.toString() !== user

          return isMember && notSender
        }
      )
    }
  }
}

export default MessageResolve
