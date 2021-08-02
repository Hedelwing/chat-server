"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = (0, _apolloServerExpress.gql)`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }

  enum SubscriptionType {
    ADD
    UPDATE
    DELETE
  } 
`;

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlRGVmcy9yb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7ZUFFZSw2QkFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdxbGBcclxuICBkaXJlY3RpdmUgQGF1dGggb24gRklFTERfREVGSU5JVElPTlxyXG4gIGRpcmVjdGl2ZSBAZ3Vlc3Qgb24gRklFTERfREVGSU5JVElPTlxyXG4gIHR5cGUgUXVlcnkge1xyXG4gICAgXzogU3RyaW5nXHJcbiAgfVxyXG4gIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgXzogU3RyaW5nXHJcbiAgfVxyXG4gIHR5cGUgU3Vic2NyaXB0aW9uIHtcclxuICAgIF86IFN0cmluZ1xyXG4gIH1cclxuXHJcbiAgZW51bSBTdWJzY3JpcHRpb25UeXBlIHtcclxuICAgIEFERFxyXG4gICAgVVBEQVRFXHJcbiAgICBERUxFVEVcclxuICB9IFxyXG5gIl19