import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    },
    chatId: {
        type: Schema.Types.ObjectID,
        ref: 'Chat',
        required: true,
    },
    body: {
        type: String,
        required: [true, "Сообщение не должно быть пустым"],
    },
}, {
    timestamps: true,
})

const Message = model('Message', messageSchema)

export default Message