"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _guest = _interopRequireDefault(require("./guest"));

var _haveAccess = _interopRequireDefault(require("./haveAccess"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  auth: _auth.default,
  guest: _guest.default,
  haveAccess: _haveAccess.default
};
exports.default = _default;