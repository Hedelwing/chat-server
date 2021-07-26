"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const {
  gql
} = require('apollo-server-express');

var _default = gql`
    extend type Query {
        me: User @auth
        user(id: ID!): User @auth
        users: [User!]! @auth
    }

    extend type Mutation {
        signIn(email: String!, password: String!): String @guest
        signUp(email: String!, nickname: String!, password: String!): String @guest
        uploadAvatar(file: Upload!): Boolean!
    }

    type User {
        id: ID!
        nickname: String!
        email: String!
        avatar: String
    }
`;

exports.default = _default;