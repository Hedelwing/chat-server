"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerErrors = require("apollo-server-errors");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cloudinary.default.config({
  cloud_name: 'dlajqlyky',
  api_key: '478439327858342',
  api_secret: 'nEt1XseNpTuUTCORdlDYFfvCIoU'
});

var _default = {
  Mutation: {
    uploadFile: async (_, {
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