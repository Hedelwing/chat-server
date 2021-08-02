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
    createChat(title: String!, members: [ID!]!): Chat @auth
    leaveChat(chatId: ID!): ID! @auth
    addInChat(chatId: ID!, members: [ID!]): Chat @auth
  }
  type Chat {
    id: ID!
    owner: User!
    title: String!
    lastMessage: Message
    members: [User]
    messages(limit: Int = 12, fromMessage: ID): [Message]
    newMessages: Int!
  }
`;

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlRGVmcy9jaGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7ZUFFZSw2QkFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3FsYFxyXG5leHRlbmQgdHlwZSBRdWVyeSB7XHJcbiAgY2hhdChjaGF0SWQ6IElEISk6IENoYXQgQGF1dGhcclxuICBjaGF0czogW0NoYXRdIEBhdXRoXHJcbn1cclxuICBleHRlbmQgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICBjcmVhdGVDaGF0KHRpdGxlOiBTdHJpbmchLCBtZW1iZXJzOiBbSUQhXSEpOiBDaGF0IEBhdXRoXHJcbiAgICBsZWF2ZUNoYXQoY2hhdElkOiBJRCEpOiBJRCEgQGF1dGhcclxuICAgIGFkZEluQ2hhdChjaGF0SWQ6IElEISwgbWVtYmVyczogW0lEIV0pOiBDaGF0IEBhdXRoXHJcbiAgfVxyXG4gIHR5cGUgQ2hhdCB7XHJcbiAgICBpZDogSUQhXHJcbiAgICBvd25lcjogVXNlciFcclxuICAgIHRpdGxlOiBTdHJpbmchXHJcbiAgICBsYXN0TWVzc2FnZTogTWVzc2FnZVxyXG4gICAgbWVtYmVyczogW1VzZXJdXHJcbiAgICBtZXNzYWdlcyhsaW1pdDogSW50ID0gMTIsIGZyb21NZXNzYWdlOiBJRCk6IFtNZXNzYWdlXVxyXG4gICAgbmV3TWVzc2FnZXM6IEludCFcclxuICB9XHJcbmAiXX0=