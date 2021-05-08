"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const messageSchema = new _mongoose.Schema({
  sender: {
    type: _mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  },
  chatId: {
    type: _mongoose.Schema.Types.ObjectID,
    ref: 'Chat',
    required: true
  },
  body: {
    type: String,
    required: [true, "Сообщение не должно быть пустым"]
  }
}, {
  timestamps: true
});
const Message = (0, _mongoose.model)('Message', messageSchema);
var _default = Message;
exports.default = _default;