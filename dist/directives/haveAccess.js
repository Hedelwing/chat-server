"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _models = require("../models");

class AccessDirective extends _apolloServerExpress.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve = _graphql.defaultFieldResolver
    } = field;

    field.resolve = async function (...args) {
      const [, {
        chatId
      }, {
        user
      }] = args;
      const data = await resolve.apply(this, args);
      if ((await _models.Chat.findById(chatId)).access.blackList.some(userId => userId.toString() == user.toString())) throw new _apolloServerExpress.UserInputError('У вас нет доступа к данному чату');
      return data;
    };
  }

}

var _default = AccessDirective;
exports.default = _default;