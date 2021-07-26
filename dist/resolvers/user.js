"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _auth = require("../utils/auth");

var _apolloServerErrors = require("apollo-server-errors");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cloudinary.default.config({
  cloud_name: 'dlajqlyky',
  api_key: '478439327858342',
  api_secret: 'nEt1XseNpTuUTCORdlDYFfvCIoU'
});

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
    signIn: (_, args) => (0, _auth.signIn)(args).then(user => (0, _auth.setTokens)(user)),
    uploadAvatar: async (_, {
      file
    }, {
      user
    }) => {
      var _result$eager$;

      const {
        createReadStream
      } = await file;
      const result = await new Promise((res, rej) => createReadStream().pipe(_cloudinary.default.v2.uploader.upload_stream({
        tags: "avatar",
        public_id: user,
        allowed_formats: '[png, jpg, webp]',
        format: 'jpg',
        eager: {
          width: 200,
          height: 200,
          crop: "fill"
        }
      }, (error, result) => {
        if (error) throw new _apolloServerErrors.ApolloError("Не удалось загрузить изображение");
        res(result);
      })));
      await _models.User.findByIdAndUpdate(user, {
        avatar: result === null || result === void 0 ? void 0 : (_result$eager$ = result.eager[0]) === null || _result$eager$ === void 0 ? void 0 : _result$eager$.secure_url
      });
      return true;
    }
  }
};
exports.default = _default;