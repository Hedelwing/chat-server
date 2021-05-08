"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _auth = require("../utils/auth");

class GuestDirective extends _apolloServerExpress.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve = _graphql.defaultFieldResolver
    } = field;

    field.resolve = function (...args) {
      const [,, {
        user
      }] = args;
      (0, _auth.ensureSignedOut)(user);
      return resolve.apply(this, args);
    };
  }

}

var _default = GuestDirective;
exports.default = _default;