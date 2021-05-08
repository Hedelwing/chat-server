import { Schema, model } from 'mongoose'
import Message from './message'

const chatSchema = new Schema({
    title: {
        type: String,
        required: [true, "Необходимо ввести заголовок чата"]
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    access: {
        blackList: [{
            type: Schema.Types.ObjectID,
            ref: 'User',
            required: true,
        }]
    },
    messages: [Schema.Types.ObjectID],
    description: String
}, {
    timestamps: true,
})

const Chat = model('Chat', chatSchema)


export default Chat