import { Chat, Message, User } from '../models'
import { ApolloError, IResolvers, UserInputError } from 'apollo-server-express'

const chatDoesntExist = "Такого чата не существует"
const mustBeMember = "Вы должны быть участником этого чата"

const ChatResolve: IResolvers = {
  Query: {
    chat: (root, { chatId }) => Chat.findById(chatId),

    chats: (_, __, { user }) => Chat.find({ members: user })

  },
  Mutation: {
    createChat: (root, args, { user }) =>
      Chat.create({
        ...args,
        members: [user, ...args.members],
        owner: user
      }),

    leaveChat: async (root, { chatId }, { user }) => {
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        { '$pull': { members: user } })

      if (!chat) throw new ApolloError(chatDoesntExist)

      await User.findByIdAndUpdate(user, { '$pull': { chats: chatId } })

      return chatId
    },

    addInChat: async (root, { chatId, members }, { user }) => {
      const chat = await Chat.findById(chatId)

      if (!chat) throw new ApolloError(chatDoesntExist)
      if (!chat.members.includes(user)) throw new ApolloError(mustBeMember)

      return Chat.findByIdAndUpdate(chatId, { '$addToSet': { members: { '$each': members } } }, { new: true })
    }
  },
  Chat: {
    owner: async chat => (await chat.populate('owner').execPopulate()).owner,

    lastMessage: chat =>
      Message.findOne()
        .where('chatId')
        .equals(chat.id)
        .sort({ createdAt: -1 }),

    members: async chat => (await chat.populate('members').execPopulate()).members,

    messages: async (chat, { limit, fromMessage }, { user }) => {
      if (!chat.members.includes(user)) throw new ApolloError(mustBeMember)

      const unreadMessages = fromMessage ? [] : await Message.find({ chatId: chat._id, viewedBy: { '$ne': user } })

      const cursor = fromMessage ? fromMessage : (unreadMessages.length && unreadMessages[0]._id)

      const messages = await Message.find({ chatId: chat._id })

      const endPos = cursor ? messages.findIndex(message => message._id.toString() === cursor.toString()) : messages.length

      const startPos = endPos - limit

      return [...messages.slice(startPos > 0 ? startPos : 0, endPos), ...unreadMessages]
    },
    newMessages: (chat, _, { user }) => Message.countDocuments({ chatId: chat._id, viewedBy: { '$ne': user } })
  }
}

export default ChatResolve
