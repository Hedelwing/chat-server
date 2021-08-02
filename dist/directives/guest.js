"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _auth = require("../utils/auth");

class GuestDirective extends _apolloServerExpress.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve = _graphql.defaultFieldResolver
    } = field;

    field.resolve = function (...args) {
      const [,, {
        user
      }] = args;
      (0, _auth.ensureSignedOut)(user);
      return resolve.apply(this, args);
    };
  }

}

var _default = GuestDirective;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL2d1ZXN0LnRzIl0sIm5hbWVzIjpbIkd1ZXN0RGlyZWN0aXZlIiwiU2NoZW1hRGlyZWN0aXZlVmlzaXRvciIsInZpc2l0RmllbGREZWZpbml0aW9uIiwiZmllbGQiLCJyZXNvbHZlIiwiZGVmYXVsdEZpZWxkUmVzb2x2ZXIiLCJhcmdzIiwidXNlciIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsY0FBTixTQUE2QkMsMkNBQTdCLENBQW9EO0FBQ2xEQyxFQUFBQSxvQkFBb0IsQ0FBQ0MsS0FBRCxFQUFnQztBQUNsRCxVQUFNO0FBQUVDLE1BQUFBLE9BQU8sR0FBR0M7QUFBWixRQUFxQ0YsS0FBM0M7O0FBRUFBLElBQUFBLEtBQUssQ0FBQ0MsT0FBTixHQUFnQixVQUFVLEdBQUdFLElBQWIsRUFBbUI7QUFDakMsWUFBTSxJQUFLO0FBQUVDLFFBQUFBO0FBQUYsT0FBTCxJQUFpQkQsSUFBdkI7QUFFQSxpQ0FBZ0JDLElBQWhCO0FBRUEsYUFBT0gsT0FBTyxDQUFDSSxLQUFSLENBQWMsSUFBZCxFQUFvQkYsSUFBcEIsQ0FBUDtBQUNELEtBTkQ7QUFPRDs7QUFYaUQ7O2VBY3JDTixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hRGlyZWN0aXZlVmlzaXRvciB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuaW1wb3J0IHsgZGVmYXVsdEZpZWxkUmVzb2x2ZXIsIEdyYXBoUUxGaWVsZCB9IGZyb20gJ2dyYXBocWwnXHJcbmltcG9ydCB7IGVuc3VyZVNpZ25lZE91dCB9IGZyb20gJy4uL3V0aWxzL2F1dGgnXHJcblxyXG5jbGFzcyBHdWVzdERpcmVjdGl2ZSBleHRlbmRzIFNjaGVtYURpcmVjdGl2ZVZpc2l0b3Ige1xyXG4gIHZpc2l0RmllbGREZWZpbml0aW9uKGZpZWxkOiBHcmFwaFFMRmllbGQ8YW55LCBhbnk+KSB7XHJcbiAgICBjb25zdCB7IHJlc29sdmUgPSBkZWZhdWx0RmllbGRSZXNvbHZlciB9ID0gZmllbGRcclxuXHJcbiAgICBmaWVsZC5yZXNvbHZlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgY29uc3QgWywgLCB7IHVzZXIgfV0gPSBhcmdzXHJcblxyXG4gICAgICBlbnN1cmVTaWduZWRPdXQodXNlcilcclxuXHJcbiAgICAgIHJldHVybiByZXNvbHZlLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHdWVzdERpcmVjdGl2ZSJdfQ==