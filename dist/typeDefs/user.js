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
        editProfile(birthday: BirthdayInput, about: String): User @auth
    }

    type User {
        id: ID!
        nickname: String!
        email: String!
        birthday: Birthday
        about: String
    }

    type Birthday {
        day: Int!
        month: Int!
        year: Int!
    }

    input BirthdayInput {
        day: Int!
        month: Int!
        year: Int!
    }
`;

exports.default = _default;