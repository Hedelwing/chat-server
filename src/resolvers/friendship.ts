import { IResolvers } from 'apollo-server-express'
import { User } from '../models'
import Friendship from '../models/friendship'
import { FriendshipDocument } from '../types'

const FriendshipResolve: IResolvers = {
    Query: {
        friends: async (_, __, { user }: { user: string }) => {
            const friends = await Friendship.getFriends(user)

            return User.find({ _id: { '$in': friends } })
        },
        receivedRequests: (_, __, { user }: { user: string }) =>
            Friendship.getReceivedRequests(user).populate('requester'),
        sentRequests: (_, __, { user }: { user: string }) => Friendship.getSentRequests(user).populate('requested')
    },
    Mutation: {
        sendFriendshipRequest: (_, { requested }: { requested: string }, { user }: { user: string }) =>
            Friendship.create({ requester: user, requested }),
        acceptFriendship: (_, { requester }: { requester: string }) =>
            Friendship.acceptFriendship(requester),
        denyFriendship: (_, { requester }: { requester: string }) => Friendship.denyFriendship(requester),
        cancelFriendship: (_, { friends }: { friends: string[] }, { user }: { user: string }) => Friendship.cancelFriendship(user, friends),
    },
    FriendRequest: {
        requester: async (request: FriendshipDocument) =>
            (await request.populate('requester').execPopulate()).requester,
        requested: async (request: FriendshipDocument) =>
            (await request.populate('requested').execPopulate()).requested
    },
}

export default FriendshipResolve