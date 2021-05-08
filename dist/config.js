"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootDir = exports.DB_NAME = exports.DB_HOST = exports.DB_PASS = exports.DB_USER = exports.PORT = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const {
  PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME
} = process.env;
exports.DB_NAME = DB_NAME;
exports.DB_HOST = DB_HOST;
exports.DB_PASS = DB_PASS;
exports.DB_USER = DB_USER;
exports.PORT = PORT;
const rootDir = __dirname;
exports.rootDir = rootDir;