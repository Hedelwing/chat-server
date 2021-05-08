import { Chat, Message, User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    chat: (root, { chatId }) => {
      if (!mongoose.Types.ObjectId.isValid(chatId))
        throw new UserInputError(`${id} isn't valid`)

      return Chat.findById(chatId)
    },
    chats: () => Chat.find()
  },
  Mutation: {
    createChat: (root, args, { user }) =>
      Chat.create({
        ...args,
        owner: user
      }),
    /*     addInChatBlackList: (root, args, { user }) =>
          Chat.findOneAndUpdate(
            { _id: args.chatId, owner: user },
            { $push: { 'access.blackList': args.userId } },
          ),
        removeFromChatBlackList: (root, args, { req }) =>
          Chat.findByIdAndUpdate(
            args.chatId,
            { $pull: { 'access.blackList': args.userId } },
          ) */
  },
  Chat: {
    owner: async chat => (await chat.populate('owner').execPopulate()).owner,
    lastMessage: chat =>
      Message.findOne()
        .where('chatId')
        .equals(chat.id)
        .sort({ createdAt: -1 })
  }
}
