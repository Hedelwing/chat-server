import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    getMessages(chatId: ID!, limit: Int = 12, fromMessage: ID): [Message] @auth
  }
  extend type Mutation {
    sendMessage(chatId: ID!, body: String!): Message @auth
    deleteMessage(id: ID!): Message @auth
    updateMessage(id: ID!, body: String!): Message @auth
    markAsRead(messageId: ID!): Boolean @auth
  }
  extend type Subscription {
    messageObserver(
      types: [SubscriptionType] = [ADD, UPDATE, DELETE]
    ): MessageSubscriptions @auth
  }
  type Message {
    id: ID!
    body: String!
    chatId: ID
    sender: User!
    createdAt: String!
    updatedAt: String!
    isViewed: Boolean!
  }

  type MessageSubscriptions {
    type: SubscriptionType
    message: Message
  }
`
