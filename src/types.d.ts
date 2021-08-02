import { Schema, Model, Query, Document, SchemaTimestampsConfig } from 'mongoose'

type ID = typeof Schema.Types.ObjectId

interface FriendshipDocument extends Document {
    requester: UserDocument['_id']
    requested: UserDocument['_id']
    status: string
}

interface FriendshipModel extends Model<FriendshipDocument> {
    acceptFriendship: (request: string) => Query<any, FriendshipDocument>
    denyFriendship: (request: string) => Query<any, FriendshipDocument>
    getFriends: (user: string) => Promise<string[]>
    getReceivedRequests: (requested: string) => Query<any, FriendshipDocument>
    getSentRequests: (requester: string) => Query<any, FriendshipDocument>
    areFriends: (user1: string, user2: string) => Promise<boolean>
    arePendingFriendship: (requester: string, requested: string) => Promise<boolean>
    cancelFriendship: (user: string, friend: string[]) => Promise<string[]>
}

interface ChatDocument extends Document {
    title: string
    owner: UserDocument['_id']
    members: [UserDocument['_id']]
    userInMembers(user: string): this
}

interface ChatModel extends Model<ChatDocument> {
    findChat: (conditions: { [key: string]: any }) => Promise<ChatDocument>
}

interface UserDocument extends Document {
    nickname: string
    password: string
    email: string
    avatar: string
    isOnline: boolean
    chats: [ChatDocument['_id']]
    matchesPassword: (password: string) => Promise<boolean>
}

interface MessageDocument extends Document, SchemaTimestampsConfig {
    sender: UserDocument['_id']
    recipients: [UserDocument['_id']]
    body: string
    chatId: [ChatDocument['_id']]
    viewedBy: [UserDocument['_id']]
    haveSenderAllow(user: string): this
}

interface MessageModel extends Model<MessageDocument> {
    findMessage: (conditions: { [key: string]: any }) => Promise<MessageDocument>
}