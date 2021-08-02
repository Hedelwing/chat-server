"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
    extend type Query {
        me: User @auth
        user(id: ID!): User @auth
        users(searched: String): [User] @auth
    }

    extend type Mutation {
        signIn(email: String!, password: String!): String @guest
        signUp(email: String!, nickname: String!, password: String!): String @guest
        signOut: Boolean! @auth
        uploadAvatar(file: Upload!): Boolean @auth
    }

    type User {
        id: ID!
        nickname: String!
        email: String!
        avatar: String
        isOnline: Boolean!
        areFriends: Boolean!
        isMe: Boolean!
        areRequesterFriendship: Boolean!
        areRequestedFriendship: Boolean!
    }
`;

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlRGVmcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7ZUFFZSw2QkFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ3FsYFxyXG4gICAgZXh0ZW5kIHR5cGUgUXVlcnkge1xyXG4gICAgICAgIG1lOiBVc2VyIEBhdXRoXHJcbiAgICAgICAgdXNlcihpZDogSUQhKTogVXNlciBAYXV0aFxyXG4gICAgICAgIHVzZXJzKHNlYXJjaGVkOiBTdHJpbmcpOiBbVXNlcl0gQGF1dGhcclxuICAgIH1cclxuXHJcbiAgICBleHRlbmQgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICAgICAgc2lnbkluKGVtYWlsOiBTdHJpbmchLCBwYXNzd29yZDogU3RyaW5nISk6IFN0cmluZyBAZ3Vlc3RcclxuICAgICAgICBzaWduVXAoZW1haWw6IFN0cmluZyEsIG5pY2tuYW1lOiBTdHJpbmchLCBwYXNzd29yZDogU3RyaW5nISk6IFN0cmluZyBAZ3Vlc3RcclxuICAgICAgICBzaWduT3V0OiBCb29sZWFuISBAYXV0aFxyXG4gICAgICAgIHVwbG9hZEF2YXRhcihmaWxlOiBVcGxvYWQhKTogQm9vbGVhbiBAYXV0aFxyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgVXNlciB7XHJcbiAgICAgICAgaWQ6IElEIVxyXG4gICAgICAgIG5pY2tuYW1lOiBTdHJpbmchXHJcbiAgICAgICAgZW1haWw6IFN0cmluZyFcclxuICAgICAgICBhdmF0YXI6IFN0cmluZ1xyXG4gICAgICAgIGlzT25saW5lOiBCb29sZWFuIVxyXG4gICAgICAgIGFyZUZyaWVuZHM6IEJvb2xlYW4hXHJcbiAgICAgICAgaXNNZTogQm9vbGVhbiFcclxuICAgICAgICBhcmVSZXF1ZXN0ZXJGcmllbmRzaGlwOiBCb29sZWFuIVxyXG4gICAgICAgIGFyZVJlcXVlc3RlZEZyaWVuZHNoaXA6IEJvb2xlYW4hXHJcbiAgICB9XHJcbmAiXX0=