import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        me: User @auth
        user(id: ID!): User @auth
        users(searched: String): [User] @auth
    }

    extend type Mutation {
        signIn(email: String!, password: String!): String @guest
        signUp(email: String!, nickname: String!, password: String!): String @guest
        signOut: Boolean! @auth
        uploadAvatar(file: Upload!): Boolean @auth
    }

    type User {
        id: ID!
        nickname: String!
        email: String!
        avatar: String
        isOnline: Boolean!
        areFriends: Boolean!
        isMe: Boolean!
        areRequesterFriendship: Boolean!
        areRequestedFriendship: Boolean!
    }
`