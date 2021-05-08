"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _auth = require("../utils/auth");

var _default = {
  Query: {
    me: (_, __, {
      user
    }) => _models.User.findById(user),
    user: (_, {
      id
    }) => _models.User.findById(id),
    users: () => _models.User.find()
  },
  Mutation: {
    signUp: (_, args) => _models.User.create(args).then(user => (0, _auth.setTokens)(user)),
    signIn: (_, args) => (0, _auth.signIn)(args).then(user => (0, _auth.setTokens)(user))
  }
};
exports.default = _default;