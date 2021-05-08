import { gql } from 'apollo-server-express'

export default gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION
  directive @haveAccess on FIELD_DEFINITION
  type Query {
    _: String
  }
  type Mutation {
    _: String
    uploadFile(file: Upload!): Boolean!
    deleteFile(deletefile: String!): Boolean!
  }
  type Subscription {
    _: String
  }

  enum SubscriptionType {
    ADD
    CHANGE
    DELETE
  } 
`