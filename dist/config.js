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
  FRONT_URI = process.env.NODE_ENV === "production" ? "https://dry-ravine-19128.herokuapp.com" : "http://localhost:8080"
} = process.env;
exports.FRONT_URI = FRONT_URI;
exports.DB_NAME = DB_NAME;
exports.DB_HOST = DB_HOST;
exports.DB_PASS = DB_PASS;
exports.DB_USER = DB_USER;
exports.PORT = PORT;
const rootDir = __dirname;
exports.rootDir = rootDir;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcudHMiXSwibmFtZXMiOlsiUE9SVCIsIkRCX1VTRVIiLCJEQl9QQVNTIiwiREJfSE9TVCIsIkRCX05BTUUiLCJGUk9OVF9VUkkiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJyb290RGlyIiwiX19kaXJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxNQUFNO0FBQ1RBLEVBQUFBLElBQUksR0FBRyxJQURFO0FBRVRDLEVBQUFBLE9BQU8sR0FBRyxXQUZEO0FBR1RDLEVBQUFBLE9BQU8sR0FBRyxVQUhEO0FBSVRDLEVBQUFBLE9BQU8sR0FBRyxpQ0FKRDtBQUtUQyxFQUFBQSxPQUFPLEdBQUcsTUFMRDtBQU1UQyxFQUFBQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDLHdDQUF4QyxHQUFtRjtBQU50RixJQU9URixPQUFPLENBQUNDLEdBUEw7Ozs7Ozs7QUFTQSxNQUFNRSxPQUFPLEdBQUdDLFNBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHtcclxuICAgIFBPUlQgPSAzMDAzLFxyXG4gICAgREJfVVNFUiA9IFwiaGVkZWx3aW5nXCIsXHJcbiAgICBEQl9QQVNTID0gXCJkYWZubzRrYVwiLFxyXG4gICAgREJfSE9TVCA9IFwiY2x1c3Rlci1temM3cC5henVyZS5tb25nb2RiLm5ldFwiLFxyXG4gICAgREJfTkFNRSA9IFwiY2hhdFwiLFxyXG4gICAgRlJPTlRfVVJJID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiID8gXCJodHRwczovL2RyeS1yYXZpbmUtMTkxMjguaGVyb2t1YXBwLmNvbVwiIDogXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIlxyXG59ID0gcHJvY2Vzcy5lbnZcclxuXHJcbmV4cG9ydCBjb25zdCByb290RGlyID0gX19kaXJuYW1lIl19