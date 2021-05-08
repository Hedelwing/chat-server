"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _config = require("../config");

var _default = {
  Mutation: {
    uploadFile: async (_, {
      file
    }, {
      req
    }) => {
      const {
        createReadStream
      } = await file;
      const filename = req.session.userId;
      await new Promise(res => createReadStream().pipe((0, _fs.createWriteStream)((0, _path.join)(_config.rootDir, "../images", filename))).on("close", res));
      return true;
    }
  }
};
exports.default = _default;