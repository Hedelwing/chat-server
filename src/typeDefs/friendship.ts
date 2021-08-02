import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        friends: [User]
        receivedRequests: [FriendRequest]
        sentRequests: [FriendRequest]
    }

    extend type Mutation {
        sendFriendshipRequest(requested: ID!): FriendRequest!
        acceptFriendship(requester: ID!): FriendRequest!
        denyFriendship(requester: ID!): FriendRequest!
        cancelFriendship(friends: [ID]): [ID]
    }

    type FriendRequest {
        id: ID!
        requester: User!
        requested: User!
        status: String
    }
`