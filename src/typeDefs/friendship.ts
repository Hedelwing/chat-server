import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        friends: [User]
        receivedRequests: [FriendRequest]
        sentRequests: [FriendRequest]
    }

    extend type Mutation {
        sendFriendshipRequest(requested: ID!): FriendRequest!
        acceptFriendship(request: ID!): FriendRequest!
        denyFriendship(request: ID!): FriendRequest!
        cancelFriendship(friend: [ID]): [ID]
    }

    type FriendRequest {
        id: ID!
        requester: User!
        requested: User!
        status: String
    }
`