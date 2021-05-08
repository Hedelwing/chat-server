"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAccessToken = validateAccessToken;
exports.validateToken = validateToken;
exports.setTokens = void 0;

var _models = require("./models");

const {
  sign,
  verify
} = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN || "secret";

function validateAccessToken(token) {
  try {
    return verify(token, secret);
  } catch {
    return null;
  }
}

const setTokens = ({
  id
}) => sign({
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