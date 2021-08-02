"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
  extend type Query {
    getMessages(chatId: ID!, limit: Int = 12, fromMessage: ID): [Message] @auth
  }
  extend type Mutation {
    sendMessage(chatId: ID!, body: String!): Message @auth
    deleteMessage(id: ID!): Message @auth
    updateMessage(id: ID!, body: String!): Message @auth
    markAsRead(messageId: ID!): Boolean @auth
  }
  extend type Subscription {
    messageObserver(
      types: [SubscriptionType] = [ADD, UPDATE, DELETE]
    ): MessageSubscriptions @auth
  }
  type Message {
    id: ID!
    body: String!
    chatId: ID
    sender: User!
    createdAt: String!
    updatedAt: String!
    isViewed: Boolean!
  }

  type MessageSubscriptions {
    type: SubscriptionType
    message: Message
  }
`;

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlRGVmcy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7ZUFFZSw2QkFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBncWwgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBncWxgXHJcbiAgZXh0ZW5kIHR5cGUgUXVlcnkge1xyXG4gICAgZ2V0TWVzc2FnZXMoY2hhdElkOiBJRCEsIGxpbWl0OiBJbnQgPSAxMiwgZnJvbU1lc3NhZ2U6IElEKTogW01lc3NhZ2VdIEBhdXRoXHJcbiAgfVxyXG4gIGV4dGVuZCB0eXBlIE11dGF0aW9uIHtcclxuICAgIHNlbmRNZXNzYWdlKGNoYXRJZDogSUQhLCBib2R5OiBTdHJpbmchKTogTWVzc2FnZSBAYXV0aFxyXG4gICAgZGVsZXRlTWVzc2FnZShpZDogSUQhKTogTWVzc2FnZSBAYXV0aFxyXG4gICAgdXBkYXRlTWVzc2FnZShpZDogSUQhLCBib2R5OiBTdHJpbmchKTogTWVzc2FnZSBAYXV0aFxyXG4gICAgbWFya0FzUmVhZChtZXNzYWdlSWQ6IElEISk6IEJvb2xlYW4gQGF1dGhcclxuICB9XHJcbiAgZXh0ZW5kIHR5cGUgU3Vic2NyaXB0aW9uIHtcclxuICAgIG1lc3NhZ2VPYnNlcnZlcihcclxuICAgICAgdHlwZXM6IFtTdWJzY3JpcHRpb25UeXBlXSA9IFtBREQsIFVQREFURSwgREVMRVRFXVxyXG4gICAgKTogTWVzc2FnZVN1YnNjcmlwdGlvbnMgQGF1dGhcclxuICB9XHJcbiAgdHlwZSBNZXNzYWdlIHtcclxuICAgIGlkOiBJRCFcclxuICAgIGJvZHk6IFN0cmluZyFcclxuICAgIGNoYXRJZDogSURcclxuICAgIHNlbmRlcjogVXNlciFcclxuICAgIGNyZWF0ZWRBdDogU3RyaW5nIVxyXG4gICAgdXBkYXRlZEF0OiBTdHJpbmchXHJcbiAgICBpc1ZpZXdlZDogQm9vbGVhbiFcclxuICB9XHJcblxyXG4gIHR5cGUgTWVzc2FnZVN1YnNjcmlwdGlvbnMge1xyXG4gICAgdHlwZTogU3Vic2NyaXB0aW9uVHlwZVxyXG4gICAgbWVzc2FnZTogTWVzc2FnZVxyXG4gIH1cclxuYFxyXG4iXX0=