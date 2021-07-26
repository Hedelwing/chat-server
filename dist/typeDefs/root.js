"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION
  directive @haveAccess on FIELD_DEFINITION
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }

  enum SubscriptionType {
    ADD
    UPDATE
    DELETE
  } 
`;

exports.default = _default;