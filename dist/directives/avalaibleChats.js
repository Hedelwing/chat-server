"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

class avalaibleChatsDirective extends _apolloServerExpress.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve = _graphql.defaultFieldResolver
    } = field;

    field.resolve = async function (...args) {
      const [,, context] = args;
      const data = await resolve.apply(this, args);
      const id = context.req.session.userId;
      return data.filter(d => d.access.blackList.some(user => user != id));
    };
  }

}

var _default = avalaibleChatsDirective;
exports.default = _default;