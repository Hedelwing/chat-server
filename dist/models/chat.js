"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const chatSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: [true, "Необходимо ввести заголовок чата"]
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  },
  access: {
    blackList: [{
      type: _mongoose.Schema.Types.ObjectID,
      ref: 'User',
      required: true
    }]
  },
  messages: [_mongoose.Schema.Types.ObjectID],
  description: String
}, {
  timestamps: true
});
const Chat = (0, _mongoose.model)('Chat', chatSchema);
var _default = Chat;
exports.default = _default;