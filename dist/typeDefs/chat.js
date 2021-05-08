"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
extend type Query {
  chat(chatId: ID!): Chat @auth
  chats: [Chat] @auth
}
  extend type Mutation {
    createChat(title: String!, description: String): Chat @auth
  }
  type Chat {
    id: ID!
    owner: User!
    title: String!
    lastMessage: Message
    access: ChatAccess
    description: String
  }

  type ChatAccess {
    blackList: [User]
  }
`;

exports.default = _default;