import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import http from 'http'
import {
    PORT,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
} from './config'
import { validateToken } from './utils/auth'

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        const app = express()

        app.disable('x-powered-by')

        const corsOptions = {
            origin: "http://localhost:8080",
            credentials: true,
        }

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            schemaDirectives,
            playground: true,
            context: async ({ req, connection }) =>
                connection ? connection.context : { user: await validateToken(req?.headers.authorization.split(' ')[1]) },
            subscriptions: {
                onConnect: async (connectionParams) => ({
                    user: await validateToken(connectionParams.token)
                })
            }
        })

        server.applyMiddleware({ app, cors: corsOptions })

        const httpServer = http.createServer(app)
        server.installSubscriptionHandlers(httpServer)

        httpServer.listen(PORT, () => {
            console.log(`http://localhost:${PORT}${server.graphqlPath}`)
            console.log(`ws://localhost:${PORT}${server.subscriptionsPath}`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()