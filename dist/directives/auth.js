"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphql = require("graphql");

var _auth = require("../utils/auth");

class AuthDirective extends _apolloServerExpress.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve = _graphql.defaultFieldResolver
    } = field;

    field.resolve = function (...args) {
      const [,, {
        user
      }] = args;
      (0, _auth.ensureSignedIn)(user);
      return resolve.apply(this, args);
    };
  }

}

var _default = AuthDirective;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL2F1dGgudHMiXSwibmFtZXMiOlsiQXV0aERpcmVjdGl2ZSIsIlNjaGVtYURpcmVjdGl2ZVZpc2l0b3IiLCJ2aXNpdEZpZWxkRGVmaW5pdGlvbiIsImZpZWxkIiwicmVzb2x2ZSIsImRlZmF1bHRGaWVsZFJlc29sdmVyIiwiYXJncyIsInVzZXIiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLGFBQU4sU0FBNEJDLDJDQUE1QixDQUFtRDtBQUNqREMsRUFBQUEsb0JBQW9CLENBQUNDLEtBQUQsRUFBZ0M7QUFDbEQsVUFBTTtBQUFFQyxNQUFBQSxPQUFPLEdBQUdDO0FBQVosUUFBcUNGLEtBQTNDOztBQUVBQSxJQUFBQSxLQUFLLENBQUNDLE9BQU4sR0FBZ0IsVUFBVSxHQUFHRSxJQUFiLEVBQW1CO0FBRWpDLFlBQU0sSUFBSztBQUFFQyxRQUFBQTtBQUFGLE9BQUwsSUFBaUJELElBQXZCO0FBRUEsZ0NBQWVDLElBQWY7QUFFQSxhQUFPSCxPQUFPLENBQUNJLEtBQVIsQ0FBYyxJQUFkLEVBQW9CRixJQUFwQixDQUFQO0FBQ0QsS0FQRDtBQVFEOztBQVpnRDs7ZUFlcENOLGEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlbWFEaXJlY3RpdmVWaXNpdG9yIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJ1xyXG5pbXBvcnQgeyBkZWZhdWx0RmllbGRSZXNvbHZlciwgR3JhcGhRTEZpZWxkIH0gZnJvbSAnZ3JhcGhxbCdcclxuaW1wb3J0IHsgZW5zdXJlU2lnbmVkSW4gfSBmcm9tICcuLi91dGlscy9hdXRoJ1xyXG5cclxuY2xhc3MgQXV0aERpcmVjdGl2ZSBleHRlbmRzIFNjaGVtYURpcmVjdGl2ZVZpc2l0b3Ige1xyXG4gIHZpc2l0RmllbGREZWZpbml0aW9uKGZpZWxkOiBHcmFwaFFMRmllbGQ8YW55LCBhbnk+KSB7XHJcbiAgICBjb25zdCB7IHJlc29sdmUgPSBkZWZhdWx0RmllbGRSZXNvbHZlciB9ID0gZmllbGRcclxuXHJcbiAgICBmaWVsZC5yZXNvbHZlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuXHJcbiAgICAgIGNvbnN0IFssICwgeyB1c2VyIH1dID0gYXJnc1xyXG5cclxuICAgICAgZW5zdXJlU2lnbmVkSW4odXNlcilcclxuXHJcbiAgICAgIHJldHVybiByZXNvbHZlLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRoRGlyZWN0aXZlIl19