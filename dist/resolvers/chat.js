"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Query: {
    chat: (root, {
      chatId
    }) => {
      if (!_mongoose.default.Types.ObjectId.isValid(chatId)) throw new _apolloServerExpress.UserInputError(`${id} isn't valid`);
      return _models.Chat.findById(chatId);
    },
    chats: () => _models.Chat.find()
  },
  Mutation: {
    createChat: (root, args, {
      user
    }) => _models.Chat.create({ ...args,
      owner: user
    })
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
    lastMessage: chat => _models.Message.findOne().where('chatId').equals(chat.id).sort({
      createdAt: -1
    })
  }
};
exports.default = _default;