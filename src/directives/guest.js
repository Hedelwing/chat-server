import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedOut } from '../utils/auth'

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args) {
      const [, , { user }] = args

      ensureSignedOut(user)

      return resolve.apply(this, args)
    }
  }
}

export default GuestDirective