"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _apolloServerExpress = require("apollo-server-express");

var _graphqlSubscriptions = require("graphql-subscriptions");

const pubsub = new _apolloServerExpress.PubSub();
const MESSAGE_SUBSCRIPTIONS = {
  ADD: 'MESSAGE_ADDED',
  UPDATE: 'MESSAGE_UPDATED',
  DELETE: 'MESSAGE_DELETED'
};

const userIsSender = async (messageId, user) => {
  const isSender = (await _models.Message.findById(messageId)).sender == user;
  if (!isSender) throw new _apolloServerExpress.ApolloError("У вас нет прав для удаления/редактирования данного сообщения");
};

var _default = {
  Query: {
    getMessages: async (root, {
      chatId,
      limit,
      fromMessage
    }) => {
      const getOffset = () => _models.Message.find({
        chatId
      }).sort({
        createdAt: -1
      }).then(messages => {
        const idx = messages.findIndex(message => message._id == fromMessage);
        if (idx === -1) throw new _apolloServerExpress.ApolloError();
        return idx + 1;
      });

      const offset = fromMessage ? await getOffset() : 0;
      return _models.Message.find({
        chatId
      }).sort({
        createdAt: -1
      }).limit(limit).skip(offset).then(data => data.sort((a, b) => a.createdAt - b.createdAt));
    }
  },
  Mutation: {
    sendMessage: async (root, args, {
      user
    }, info) => {
      const message = await _models.Message.create({ ...args,
        sender: user
      });
      pubsub.publish(MESSAGE_SUBSCRIPTIONS.ADD, {
        type: 'ADD',
        message
      });
      return message;
    },
    deleteMessage: async (root, {
      id
    }, {
      user
    }) => {
      await userIsSender(id, user);
      const message = await _models.Message.findByIdAndDelete(id);
      pubsub.publish(MESSAGE_SUBSCRIPTIONS.DELETE, {
        type: 'DELETE',
        message
      });
      return message;
    },
    updateMessage: async (root, {
      id,
      body
    }, {
      user
    }) => {
      await userIsSender(id, user);
      const message = await _models.Message.findByIdAndUpdate(id, {
        body
      }, {
        new: true
      });
      pubsub.publish(MESSAGE_SUBSCRIPTIONS.UPDATE, {
        type: 'UPDATE',
        message
      });
      return message;
    }
  },
  Message: {
    sender: async message => (await message.populate('sender').execPopulate()).sender
  },
  Subscription: {
    messageObserver: {
      resolve: payload => payload,
      subscribe: (0, _graphqlSubscriptions.withFilter)((root, {
        types
      }) => {
        const subscriptions = types.map(type => MESSAGE_SUBSCRIPTIONS[type]);
        return pubsub.asyncIterator(subscriptions);
      }, ({
        message
      }, {
        chatId
      }, ...rest) => {
        return message.chatId.toString() == chatId.toString();
      })
    }
  }
};
exports.default = _default;