import { User } from '../models'
import { signIn, signOut } from '../utils/auth'
import { setTokens } from '../utils/auth'

export default {
    Query: {
        me: (_, __, { user }) => User.findById(user),
        user: (_, { id }) => User.findById(id),
        users: () => User.find(),
    },
    Mutation: {
        signUp: (_, args) => User.create(args).then(user => setTokens(user)),
        signIn: (_, args) => signIn(args).then(user => setTokens(user)),
    },
}