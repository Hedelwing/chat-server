import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { UserInputError } from 'apollo-server-express'
import { Chat } from '../models'

class AccessDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = async function (...args) {

            const [, { chatId }, { user }] = args

            const data = await resolve.apply(this, args)

            if ((await Chat.findById(chatId)).access.blackList.some(userId => userId.toString() == user.toString()))
                throw new UserInputError('У вас нет доступа к данному чату')

            return data
        }
    }
}

export default AccessDirective