import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  chat(chatId: ID!): Chat @auth
  chats: [Chat] @auth
}
  extend type Mutation {
    createChat(title: String!, description: String): Chat @auth
  }
  type Chat {
    id: ID!
    owner: User!
    title: String!
    lastMessage: Message
    access: ChatAccess
    description: String
  }

  type ChatAccess {
    blackList: [User]
  }
`