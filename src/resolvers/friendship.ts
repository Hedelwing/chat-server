import { User } from '../models'
import Friendship from '../models/friendship'

export default {
    Query: {
        friends: async (_, __, { user }) => {
            const friends = await Friendship.getFriends(user)

            return User.find({ _id: { '$in': friends } })
        },
        receivedRequests: (_, __, { user }) =>
            Friendship.getReceivedRequests(user).populate('requester'),
        sentRequests: (_, __, { user }) => Friendship.getSentRequests(user).populate('requested')
    },
    Mutation: {
        sendFriendshipRequest: (_, { requested }, { user }) =>
            Friendship.create({ requester: user, requested }),
        acceptFriendship: (_, { request }) =>
            Friendship.acceptFriendship(request),
        denyFriendship: (_, { request }) => Friendship.denyFriendship(request),
        cancelFriendship: (_, { friend }, { user }) => Friendship.cancelFriendship(friend, user),
    },
    FriendRequest: {
        requester: async request =>
          (await request.populate('requester').execPopulate()).requester,
        requested: async request =>
          (await request.populate('requested').execPopulate()).requested
      },
}