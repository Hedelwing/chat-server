import { Schema, model, Document, Model, SchemaTimestampsConfig } from 'mongoose'

type ID = typeof Schema.Types.ObjectId

interface MessageDocument extends Document, SchemaTimestampsConfig {
    sender: ID
    recipients: ID
    body: string
    chatId: ID
    viewedBy: ID
}

const messageSchema = new Schema<MessageDocument, Model<MessageDocument>, MessageDocument>({
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


const Message = model<MessageDocument>('Message', messageSchema)

export default Message