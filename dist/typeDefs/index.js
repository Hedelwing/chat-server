"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _root = _interopRequireDefault(require("./root"));

var _user = _interopRequireDefault(require("./user"));

var _chat = _interopRequireDefault(require("./chat"));

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_root.default, _user.default, _chat.default, _message.default];
exports.default = _default;