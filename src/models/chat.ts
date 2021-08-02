import { Schema, model } from 'mongoose'
import { ChatDocument, ChatModel } from '../types'

const chatSchema = new Schema<ChatDocument, ChatModel, any>({
    title: {
        type: String,
        required: [true, "Необходимо ввести заголовок чата"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
})

chatSchema.statics.findChat = async function (conditions: { [key: string]: any }) {
    const chat = await this.findOne(conditions)

    if (!chat) throw new Error("Чат не найден")

    return chat
}

chatSchema.methods.userInMembers = function (user: string) {
    if (!this.members.includes(user)) throw new Error("Вы не состоите в данном чате")

    return this
}

const Chat = model<ChatDocument, ChatModel>('Chat', chatSchema)

export default Chat