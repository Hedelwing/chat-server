"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootDir = exports.FRONT_URI = exports.DB_NAME = exports.DB_HOST = exports.DB_PASS = exports.DB_USER = exports.PORT = void 0;
const {
  PORT = 3003,
  DB_USER = "hedelwing",
  DB_PASS = "dafno4ka",
  DB_HOST = "cluster-mzc7p.azure.mongodb.net",
  DB_NAME = "chat",
  FRONT_URI = "http://localhost:8080"
} = process.env;
exports.FRONT_URI = FRONT_URI;
exports.DB_NAME = DB_NAME;
exports.DB_HOST = DB_HOST;
exports.DB_PASS = DB_PASS;
exports.DB_USER = DB_USER;
exports.PORT = PORT;
const rootDir = __dirname;
exports.rootDir = rootDir;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcudHMiXSwibmFtZXMiOlsiUE9SVCIsIkRCX1VTRVIiLCJEQl9QQVNTIiwiREJfSE9TVCIsIkRCX05BTUUiLCJGUk9OVF9VUkkiLCJwcm9jZXNzIiwiZW52Iiwicm9vdERpciIsIl9fZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTTtBQUNUQSxFQUFBQSxJQUFJLEdBQUcsSUFERTtBQUVUQyxFQUFBQSxPQUFPLEdBQUcsV0FGRDtBQUdUQyxFQUFBQSxPQUFPLEdBQUcsVUFIRDtBQUlUQyxFQUFBQSxPQUFPLEdBQUcsaUNBSkQ7QUFLVEMsRUFBQUEsT0FBTyxHQUFHLE1BTEQ7QUFNVEMsRUFBQUEsU0FBUyxHQUFHO0FBTkgsSUFPVEMsT0FBTyxDQUFDQyxHQVBMOzs7Ozs7O0FBU0EsTUFBTUMsT0FBTyxHQUFHQyxTQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB7XHJcbiAgICBQT1JUID0gMzAwMyxcclxuICAgIERCX1VTRVIgPSBcImhlZGVsd2luZ1wiLFxyXG4gICAgREJfUEFTUyA9IFwiZGFmbm80a2FcIixcclxuICAgIERCX0hPU1QgPSBcImNsdXN0ZXItbXpjN3AuYXp1cmUubW9uZ29kYi5uZXRcIixcclxuICAgIERCX05BTUUgPSBcImNoYXRcIixcclxuICAgIEZST05UX1VSSSA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwXCJcclxufSA9IHByb2Nlc3MuZW52XHJcblxyXG5leHBvcnQgY29uc3Qgcm9vdERpciA9IF9fZGlybmFtZSJdfQ==