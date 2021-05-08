"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _directives = _interopRequireDefault(require("./directives"));

var _http = _interopRequireDefault(require("http"));

var _config = require("./config");

var _auth = require("./utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = async () => {
  try {
    await _mongoose.default.connect(`mongodb+srv://${_config.DB_USER}:${_config.DB_PASS}@${_config.DB_HOST}/${_config.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const app = (0, _express.default)();
    app.disable('x-powered-by');
    const corsOptions = {
      origin: "http://localhost:8080",
      credentials: true
    };
    const server = new _apolloServerExpress.ApolloServer({
      typeDefs: _typeDefs.default,
      resolvers: _resolvers.default,
      schemaDirectives: _directives.default,
      playground: true,
      context: async ({
        req,
        connection
      }) => connection ? connection.context : {
        user: await (0, _auth.validateToken)(req === null || req === void 0 ? void 0 : req.headers.authorization.split(' ')[1])
      },
      subscriptions: {
        onConnect: async connectionParams => ({
          user: await (0, _auth.validateToken)(connectionParams.token)
        })
      }
    });
    server.applyMiddleware({
      app,
      cors: corsOptions
    });

    const httpServer = _http.default.createServer(app);

    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(_config.PORT, () => {
      console.log(`http://localhost:${_config.PORT}${server.graphqlPath}`);
      console.log(`ws://localhost:${_config.PORT}${server.subscriptionsPath}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();