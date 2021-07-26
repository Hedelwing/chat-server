import { Chat, Message } from '../models'
import { PubSub, ApolloError } from 'apollo-server-express'
import { withFilter } from 'graphql-subscriptions'
import message from '../typeDefs/message'

const pubsub = new PubSub()

const MESSAGE_SUBSCRIPTIONS = {
  ADD: 'MESSAGE_ADDED',
  UPDATE: 'MESSAGE_UPDATED',
  DELETE: 'MESSAGE_DELETED'
}

const userIsSender = async (messageId, user) => {
  const isSender = (await Message.findById(messageId)).sender == user

  if (!isSender)
    throw new ApolloError("У вас нет прав для удаления/редактирования данного сообщения")
}

export default {
  Query: {
    getMessages: async (root, { chatId, limit, fromMessage }, { user }) => {
      const { members } = await Chat.findById(chatId)

      if (!members.includes(user)) throw new ApolloError("Вы не состоите в данном чате")

      const getOffset = () =>
        Message.find({ chatId })
          .sort({ createdAt: -1 })
          .then(messages => {
            const idx = messages.findIndex(message => message._id == fromMessage)

            if (idx === -1) throw new ApolloError("")

            return idx + 1
          })

      const offset = fromMessage ? await getOffset() : 0

      return Message.find({ chatId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset)
        .then(data => data.sort((a, b) => +a.createdAt - +b.createdAt))
    },
  },
  Mutation: {
    sendMessage: async (root, args, { user }, info) => {
      const message = await Message.create({
        ...args,
        sender: user,
        viewedBy: [user]
      })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.ADD, { type: 'ADD', message })

      return message
    },
    deleteMessage: async (root, { id }, { user }) => {
      await userIsSender(id, user)

      const message = await Message.findByIdAndDelete(id)

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.DELETE, { type: 'DELETE', message })

      return message
    },
    updateMessage: async (root, { id, body }, { user }) => {
      await userIsSender(id, user)

      const message = await Message.findByIdAndUpdate(id, { body }, { new: true })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.UPDATE, { type: 'UPDATE', message })

      return message
    },
    markAsRead: async (root, { messageId }, { user }) => {
      await Message.updateOne({ _id: messageId }, { $push: { viewedBy: user } })

      return true
    }
  },
  Message: {
    sender: async message =>
      (await message.populate('sender').execPopulate()).sender,
    isViewed: ({ viewedBy }, _, { user }) => viewedBy.includes(user)
  },
  Subscription: {
    messageObserver: {
      resolve: (payload) => payload,
      subscribe: withFilter(
        (root, { types }) => {
          const subscriptions = types.map(type => MESSAGE_SUBSCRIPTIONS[type])

          return pubsub.asyncIterator(subscriptions)
        },
        async ({ message }, _, { user }) => {
          const isMember = (await Chat.findById(message.chatId))
            .members.some(member => member == user)

          const notSender = (await message.populate('sender').execPopulate()).sender.id !== user

          return isMember && notSender
        }
      )
    }
  }
}
