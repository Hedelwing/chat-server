"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAccessToken = validateAccessToken;
exports.validateToken = validateToken;
exports.setTokens = exports.ensureSignedOut = exports.ensureSignedIn = exports.signIn = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _models = require("../models");

var _jsonwebtoken = require("jsonwebtoken");

const signIn = async ({
  email,
  password
}) => {
  const message = 'Неверный email или пароль';
  const user = await _models.User.findOne({
    email
  });

  if (!user || !(await user.matchesPassword(password))) {
    throw new _apolloServerExpress.AuthenticationError(message);
  }

  return user;
};

exports.signIn = signIn;

const ensureSignedIn = user => {
  if (!user) {
    throw new _apolloServerExpress.AuthenticationError('Вы должны быть авторизованы');
  }
};

exports.ensureSignedIn = ensureSignedIn;

const ensureSignedOut = user => {
  if (user) {
    throw new _apolloServerExpress.AuthenticationError('Вы уже авторизованы');
  }
};

exports.ensureSignedOut = ensureSignedOut;
const secret = process.env.SECRET_TOKEN || "secret";

function validateAccessToken(token) {
  try {
    return (0, _jsonwebtoken.verify)(token, secret);
  } catch {
    return null;
  }
}

const setTokens = ({
  id
}) => (0, _jsonwebtoken.sign)({
  id
}, secret, {
  expiresIn: '1d'
});

exports.setTokens = setTokens;

async function validateToken(accessToken) {
  var _validateAccessToken;

  const userId = accessToken && ((_validateAccessToken = validateAccessToken(accessToken)) === null || _validateAccessToken === void 0 ? void 0 : _validateAccessToken.id);
  return userId && (await _models.User.findById(userId)) ? userId : null;
}