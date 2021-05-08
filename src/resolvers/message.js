import { Message } from '../models'
import { UserInputError, PubSub, ApolloError } from 'apollo-server-express'
import { withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

const MESSAGE_SUBSCRIPTIONS = {
  ADD: 'MESSAGE_ADDED',
  CHANGE: 'MESSAGE_CHANGED',
  DELETE: 'MESSAGE_DELETED'
}

const userIsSender = (message, user) => {
  const isSender = message.sender == user

  if (!isSender)
    throw new ApolloError("У вас нет прав для удаления/редактирования данного сообщения")
}

export default {
  Query: {
    getMessages: (root, { chatId, limit }) =>
      Message.find({ chatId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .then(data => data.sort((a, b) => a.createdAt - b.createdAt)),
    getMoreMessages: async (_, { chatId, lastMessage, limit }) => {
      const messages = await Message.find({ chatId })

      const offset = messages.findIndex(message => message._id.toString() === lastMessage.toString())

      if (offset === -1) throw new UserInputError()

      return Message.find({ chatId })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .then(data => data.sort((a, b) => a.createdAt - b.createdAt))
    }
  },
  Mutation: {
    sendMessage: async (root, args, { user }, info) => {
      const message = await Message.create({
        ...args,
        sender: user
      })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.ADD, { type: 'ADD', message })

      return message
    },
    deleteMessage: async (root, args, { user }) => {
      userIsSender(await Message.findById(user), user)
      const message = await Message.findByIdAndDelete(args.id)

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.DELETE, { type: 'DELETE', message })

      return message
    },
    updateMessage: async (root, { id, body }, { user }) => {
      userIsSender(await Message.findById(user), user)

      const message = await Message.findByIdAndUpdate(id, { body })

      pubsub.publish(MESSAGE_SUBSCRIPTIONS.UPDATE, { type: 'UPDATE', message })

      return message
    }
  },
  Message: {
    sender: async message =>
      (await message.populate('sender').execPopulate()).sender
  },
  Subscription: {
    messageObserver: {
      resolve: payload => payload,
      subscribe: withFilter(
        (root, { types }) => {
          const subscriptions = types.map(type => MESSAGE_SUBSCRIPTIONS[type])

          return pubsub.asyncIterator(subscriptions)
        },
        ({ message }, { chatId }, ...rest) => {
          return message.chatId.toString() == chatId.toString()
        }
      )
    }
  }
}
