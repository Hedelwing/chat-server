"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
  extend type Query {
    getMessages(chatId: ID!, limit: Int = 12): [Message] @auth @haveAccess
    getMoreMessages(chatId: ID!, lastMessage: ID!, limit: Int = 12): [Message]
  }
  extend type Mutation {
    sendMessage(chatId: ID!, body: String!): Message @auth @haveAccess
    deleteMessage(id: ID!): Message @auth
    updateMessage(id: ID!, body: String!): Message @auth
  }
  extend type Subscription {
    messageObserver(
      chatId: ID!
      types: [SubscriptionType] = [ADD, CHANGE, DELETE]
    ): MessageSubscriptions @auth @haveAccess
  }
  type Message {
    id: ID!
    body: String!
    chatId: ID!
    sender: User!
    createdAt: String!
    updatedAt: String!
  }

  type MessageSubscriptions {
    type: SubscriptionType
    message: Message
  }
`;

exports.default = _default;