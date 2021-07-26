import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  chat(chatId: ID!): Chat @auth
  chats: [Chat] @auth
}
  extend type Mutation {
    createChat(title: String!, members: [ID!]!): Chat @auth
    leaveChat(chatId: ID!): ID! @auth
    addInChat(chatId: ID!, members: [ID!]): Chat @auth
  }
  type Chat {
    id: ID!
    owner: User!
    title: String!
    lastMessage: Message
    members: [User]
    messages(limit: Int = 12, fromMessage: ID): [Message]
    newMessages: Int!
  }
`