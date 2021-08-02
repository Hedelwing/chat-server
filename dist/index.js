"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _config = require("./config");

var _apolloServerExpress = require("apollo-server-express");

var _http = _interopRequireDefault(require("http"));

var _typeDefs = _interopRequireDefault(require("./typeDefs"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _directives = _interopRequireDefault(require("./directives"));

var _auth = require("./utils/auth");

var _models = require("./models");

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
      origin: _config.FRONT_URI,
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
        user: await (0, _auth.validateToken)(req && req.headers.authorization.split(' ')[1])
      },
      subscriptions: {
        onConnect: async ({
          token
        }) => {
          const user = await (0, _auth.validateToken)(token);
          if (user) await _models.User.updateOne({
            _id: user
          }, {
            isOnline: true
          });
          return {
            user
          };
        },
        onDisconnect: async (_, context) => {
          const {
            user
          } = await context.initPromise;
          await _models.User.updateOne({
            _id: user
          }, {
            isOnline: false
          });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzdGFydCIsIm1vbmdvb3NlIiwiY29ubmVjdCIsIkRCX1VTRVIiLCJEQl9QQVNTIiwiREJfSE9TVCIsIkRCX05BTUUiLCJ1c2VOZXdVcmxQYXJzZXIiLCJ1c2VVbmlmaWVkVG9wb2xvZ3kiLCJ1c2VGaW5kQW5kTW9kaWZ5IiwiYXBwIiwiZGlzYWJsZSIsImNvcnNPcHRpb25zIiwib3JpZ2luIiwiRlJPTlRfVVJJIiwiY3JlZGVudGlhbHMiLCJzZXJ2ZXIiLCJBcG9sbG9TZXJ2ZXIiLCJ0eXBlRGVmcyIsInJlc29sdmVycyIsInNjaGVtYURpcmVjdGl2ZXMiLCJwbGF5Z3JvdW5kIiwiY29udGV4dCIsInJlcSIsImNvbm5lY3Rpb24iLCJ1c2VyIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJzcGxpdCIsInN1YnNjcmlwdGlvbnMiLCJvbkNvbm5lY3QiLCJ0b2tlbiIsIlVzZXIiLCJ1cGRhdGVPbmUiLCJfaWQiLCJpc09ubGluZSIsIm9uRGlzY29ubmVjdCIsIl8iLCJpbml0UHJvbWlzZSIsImFwcGx5TWlkZGxld2FyZSIsImNvcnMiLCJodHRwU2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImluc3RhbGxTdWJzY3JpcHRpb25IYW5kbGVycyIsImxpc3RlbiIsIlBPUlQiLCJjb25zb2xlIiwibG9nIiwiZ3JhcGhxbFBhdGgiLCJzdWJzY3JpcHRpb25zUGF0aCIsImUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFRQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLEtBQUssR0FBRyxZQUFZO0FBQ3RCLE1BQUk7QUFDQSxVQUFNQyxrQkFBU0MsT0FBVCxDQUNELGlCQUFnQkMsZUFBUSxJQUFHQyxlQUFRLElBQUdDLGVBQVEsSUFBR0MsZUFBUSxFQUR4RCxFQUVGO0FBQ0lDLE1BQUFBLGVBQWUsRUFBRSxJQURyQjtBQUVJQyxNQUFBQSxrQkFBa0IsRUFBRSxJQUZ4QjtBQUdJQyxNQUFBQSxnQkFBZ0IsRUFBRTtBQUh0QixLQUZFLENBQU47QUFTQSxVQUFNQyxHQUFHLEdBQUcsdUJBQVo7QUFFQUEsSUFBQUEsR0FBRyxDQUFDQyxPQUFKLENBQVksY0FBWjtBQUVBLFVBQU1DLFdBQVcsR0FBRztBQUNoQkMsTUFBQUEsTUFBTSxFQUFFQyxpQkFEUTtBQUVoQkMsTUFBQUEsV0FBVyxFQUFFO0FBRkcsS0FBcEI7QUFLQSxVQUFNQyxNQUFNLEdBQUcsSUFBSUMsaUNBQUosQ0FBaUI7QUFDNUJDLE1BQUFBLFFBQVEsRUFBUkEsaUJBRDRCO0FBRTVCQyxNQUFBQSxTQUFTLEVBQVRBLGtCQUY0QjtBQUc1QkMsTUFBQUEsZ0JBQWdCLEVBQWhCQSxtQkFINEI7QUFJNUJDLE1BQUFBLFVBQVUsRUFBRSxJQUpnQjtBQUs1QkMsTUFBQUEsT0FBTyxFQUFFLE9BQU87QUFBRUMsUUFBQUEsR0FBRjtBQUFPQyxRQUFBQTtBQUFQLE9BQVAsS0FDTEEsVUFBVSxHQUFHQSxVQUFVLENBQUNGLE9BQWQsR0FBd0I7QUFBRUcsUUFBQUEsSUFBSSxFQUFFLE1BQU0seUJBQWNGLEdBQUcsSUFBSUEsR0FBRyxDQUFDRyxPQUFKLENBQWFDLGFBQWIsQ0FBNEJDLEtBQTVCLENBQWtDLEdBQWxDLEVBQXVDLENBQXZDLENBQXJCO0FBQWQsT0FOVjtBQU81QkMsTUFBQUEsYUFBYSxFQUFFO0FBQ1hDLFFBQUFBLFNBQVMsRUFBRSxPQUFPO0FBQUVDLFVBQUFBO0FBQUYsU0FBUCxLQUEwQjtBQUNqQyxnQkFBTU4sSUFBSSxHQUFHLE1BQU0seUJBQWNNLEtBQWQsQ0FBbkI7QUFFQSxjQUFJTixJQUFKLEVBQVUsTUFBTU8sYUFBS0MsU0FBTCxDQUFlO0FBQUVDLFlBQUFBLEdBQUcsRUFBRVQ7QUFBUCxXQUFmLEVBQThCO0FBQUVVLFlBQUFBLFFBQVEsRUFBRTtBQUFaLFdBQTlCLENBQU47QUFFVixpQkFBTztBQUFFVixZQUFBQTtBQUFGLFdBQVA7QUFDSCxTQVBVO0FBUVhXLFFBQUFBLFlBQVksRUFBRSxPQUFPQyxDQUFQLEVBQVVmLE9BQVYsS0FBc0I7QUFDaEMsZ0JBQU07QUFBRUcsWUFBQUE7QUFBRixjQUFXLE1BQU1ILE9BQU8sQ0FBQ2dCLFdBQS9CO0FBRUEsZ0JBQU1OLGFBQUtDLFNBQUwsQ0FBZTtBQUFFQyxZQUFBQSxHQUFHLEVBQUVUO0FBQVAsV0FBZixFQUE4QjtBQUFFVSxZQUFBQSxRQUFRLEVBQUU7QUFBWixXQUE5QixDQUFOO0FBQ0g7QUFaVTtBQVBhLEtBQWpCLENBQWY7QUF1QkFuQixJQUFBQSxNQUFNLENBQUN1QixlQUFQLENBQXVCO0FBQUU3QixNQUFBQSxHQUFGO0FBQU84QixNQUFBQSxJQUFJLEVBQUU1QjtBQUFiLEtBQXZCOztBQUVBLFVBQU02QixVQUFVLEdBQUdDLGNBQUtDLFlBQUwsQ0FBa0JqQyxHQUFsQixDQUFuQjs7QUFDQU0sSUFBQUEsTUFBTSxDQUFDNEIsMkJBQVAsQ0FBbUNILFVBQW5DO0FBRUFBLElBQUFBLFVBQVUsQ0FBQ0ksTUFBWCxDQUFrQkMsWUFBbEIsRUFBd0IsTUFBTTtBQUMxQkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsb0JBQW1CRixZQUFLLEdBQUU5QixNQUFNLENBQUNpQyxXQUFZLEVBQTFEO0FBQ0FGLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLGtCQUFpQkYsWUFBSyxHQUFFOUIsTUFBTSxDQUFDa0MsaUJBQWtCLEVBQTlEO0FBQ0gsS0FIRDtBQUlILEdBbkRELENBbURFLE9BQU9DLENBQVAsRUFBVTtBQUNSSixJQUFBQSxPQUFPLENBQUNLLEtBQVIsQ0FBY0QsQ0FBZDtBQUNIO0FBQ0osQ0F2REQ7O0FBeURBbkQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcclxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcclxuaW1wb3J0IHtcclxuICAgIFBPUlQsXHJcbiAgICBEQl9VU0VSLFxyXG4gICAgREJfUEFTUyxcclxuICAgIERCX0hPU1QsXHJcbiAgICBEQl9OQU1FLFxyXG4gICAgRlJPTlRfVVJJLFxyXG59IGZyb20gJy4vY29uZmlnJ1xyXG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIgfSBmcm9tICdhcG9sbG8tc2VydmVyLWV4cHJlc3MnXHJcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnXHJcbmltcG9ydCB0eXBlRGVmcyBmcm9tICcuL3R5cGVEZWZzJ1xyXG5pbXBvcnQgcmVzb2x2ZXJzIGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgc2NoZW1hRGlyZWN0aXZlcyBmcm9tICcuL2RpcmVjdGl2ZXMnXHJcbmltcG9ydCB7IHZhbGlkYXRlVG9rZW4gfSBmcm9tICcuL3V0aWxzL2F1dGgnXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9tb2RlbHNcIlxyXG5cclxuY29uc3Qgc3RhcnQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QoXHJcbiAgICAgICAgICAgIGBtb25nb2RiK3NydjovLyR7REJfVVNFUn06JHtEQl9QQVNTfUAke0RCX0hPU1R9LyR7REJfTkFNRX1gLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1c2VGaW5kQW5kTW9kaWZ5OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICBjb25zdCBhcHAgPSBleHByZXNzKClcclxuXHJcbiAgICAgICAgYXBwLmRpc2FibGUoJ3gtcG93ZXJlZC1ieScpXHJcblxyXG4gICAgICAgIGNvbnN0IGNvcnNPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBvcmlnaW46IEZST05UX1VSSSxcclxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICAgICAgICAgICAgdHlwZURlZnMsXHJcbiAgICAgICAgICAgIHJlc29sdmVycyxcclxuICAgICAgICAgICAgc2NoZW1hRGlyZWN0aXZlcyxcclxuICAgICAgICAgICAgcGxheWdyb3VuZDogdHJ1ZSxcclxuICAgICAgICAgICAgY29udGV4dDogYXN5bmMgKHsgcmVxLCBjb25uZWN0aW9uIH0pID0+XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID8gY29ubmVjdGlvbi5jb250ZXh0IDogeyB1c2VyOiBhd2FpdCB2YWxpZGF0ZVRva2VuKHJlcSAmJiByZXEuaGVhZGVycyEuYXV0aG9yaXphdGlvbiEuc3BsaXQoJyAnKVsxXSkgfSxcclxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgb25Db25uZWN0OiBhc3luYyAoeyB0b2tlbiB9OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdmFsaWRhdGVUb2tlbih0b2tlbilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIpIGF3YWl0IFVzZXIudXBkYXRlT25lKHsgX2lkOiB1c2VyIH0sIHsgaXNPbmxpbmU6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdXNlciB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25EaXNjb25uZWN0OiBhc3luYyAoXywgY29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdXNlciB9ID0gYXdhaXQgY29udGV4dC5pbml0UHJvbWlzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBVc2VyLnVwZGF0ZU9uZSh7IF9pZDogdXNlciB9LCB7IGlzT25saW5lOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCwgY29yczogY29yc09wdGlvbnMgfSlcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcClcclxuICAgICAgICBzZXJ2ZXIuaW5zdGFsbFN1YnNjcmlwdGlvbkhhbmRsZXJzKGh0dHBTZXJ2ZXIpXHJcblxyXG4gICAgICAgIGh0dHBTZXJ2ZXIubGlzdGVuKFBPUlQsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYGh0dHA6Ly9sb2NhbGhvc3Q6JHtQT1JUfSR7c2VydmVyLmdyYXBocWxQYXRofWApXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB3czovL2xvY2FsaG9zdDoke1BPUlR9JHtzZXJ2ZXIuc3Vic2NyaXB0aW9uc1BhdGh9YClcclxuICAgICAgICB9KVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgIH1cclxufVxyXG5cclxuc3RhcnQoKSJdfQ==