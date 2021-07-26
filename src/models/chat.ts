import { Schema, model, Document } from 'mongoose'

interface ChatDocument extends Document {
    title: string
    owner: typeof Schema.Types.ObjectId
    members: [Document['_id']]
}

const chatSchema = new Schema<ChatDocument>({
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

const Chat = model<ChatDocument>('Chat', chatSchema)


export default Chat