import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { ensureSignedIn } from '../utils/auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {

      const [, , { user }] = args

      ensureSignedIn(user)

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective