import mongoose from 'mongoose'
import express from 'express'
import {
    PORT,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
} from './config'
import { ApolloServer } from 'apollo-server-express'
import http from 'http'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { validateToken } from './utils/auth'
import { User } from "./models"

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
                onConnect: async ({ token }: { token: string }) => {
                    const user = await validateToken(token)

                    if (user) await User.updateOne({ _id: user }, { isOnline: true })

                    return { user }
                },
                onDisconnect: async (_, context) => {
                    const { user } = await context.initPromise

                    await User.updateOne({ _id: user }, { isOnline: false })
                }
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