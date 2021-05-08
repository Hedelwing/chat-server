"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcrypt = require("bcrypt");

const userSchema = new _mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "Обязательное поле"],
    minlength: [3, "Nickname должен содержать не менее 3-х символов"],
    maxlength: [20, "Nickname должен содержать не более 20-ти символов"]
  },
  password: {
    type: String,
    required: [true, "Обязательное поле"],
    validate: {
      validator: pass => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/g.test(pass),
      message: () => `Пароль должен содержать число, буквы верхнего и нижнего регистра`
    }
  },
  email: {
    type: String,
    required: [true, "Обязательное поле"],
    validate: [{
      validator: email => /.@.+\../.test(email),
      message: props => `${props.value} некорректен`
    }, {
      validator: email => User.doesntExist({
        email
      }),
      message: () => `Email уже используется`
    }]
  },
  birthday: Object,
  about: {
    type: String,
    maxlength: [500, "Текст слишком длинный"]
  },
  chats: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  isOnline: Boolean
}, {
  timestamps: true
});
userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await (0, _bcrypt.hash)(this.password, 10);
});

userSchema.statics.doesntExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function (password) {
  return (0, _bcrypt.compare)(password, this.password);
};

const User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports.default = _default;