import { Schema, model, } from 'mongoose'
import { MessageDocument, MessageModel } from '../types'

const messageSchema = new Schema<MessageDocument, MessageModel, any>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: [true, "Сообщение не должно быть пустым"],
    },
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    viewedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
})

messageSchema.statics.findMessage = async function (conditions: { [key: string]: any }) {
    const chat = await this.findOne(conditions)

    if (!chat) throw new Error("Чат не найден")

    return chat
}

messageSchema.methods.haveSenderAllow = function (user: string) {
    if (!(this.sender.toString() === user)) 
        throw new Error("У вас нет прав для редактирования данного сообщения")

    return this
}

const Message = model<MessageDocument, MessageModel>('Message', messageSchema)

export default Message