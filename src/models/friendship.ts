import { Schema, model, Model, Query, Document } from 'mongoose'

type ID = typeof Schema.Types.ObjectId

interface FriendshipDocument extends Document {
    requester: ID
    requested: ID
    status: string
}

interface FriendshipModel extends Model<FriendshipDocument> {
    acceptFriendship: (request: ID) => Query<any, FriendshipDocument>
    denyFriendship: (request: ID) => Query<any, FriendshipDocument>
    getFriends: (user: ID) => Promise<ID[]>
    getReceivedRequests: (requested: ID) => Query<any, FriendshipDocument>
    getSentRequests: (requester: ID) => Query<any, FriendshipDocument>
    areFriends: (user1: ID, user2: ID) => Promise<boolean>
    arePendingFriendship: (requester: ID, requested: ID) => Promise<boolean>
    cancelFriendship: (user: ID, friend: ID[]) => Promise<ID[]>
}

const friendshipSchema = new Schema<FriendshipDocument, Model<FriendshipDocument>, FriendshipDocument>({
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requested: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'Pending' }
}, {
    timestamps: true,
})

friendshipSchema.pre('save', function () {
    Friendship.findOne({
        requester: this.requester,
        requested: this.requested
    }).then((friendship) => {
        if (friendship)
            throw new Error((friendship.status === 'Pending')
                ? 'Запрос уже был отправлен'
                : 'Вы уже друзья'
            );
    })
})

friendshipSchema.statics.getSentRequests = function (requester: ID) {
    return this.find({ requester, status: 'Pending' })
}

friendshipSchema.statics.getReceivedRequests = function (requested: ID) {
    return this.find({ requested, status: 'Pending' })
}

friendshipSchema.statics.acceptFriendship = function (request: ID) {
    return this.findByIdAndUpdate(request, { status: 'Accepted' }).then(friendship => {
        if (!friendship) throw new Error('Запрос не существует')

        return friendship
    })
}

friendshipSchema.statics.denyFriendship = function (request: ID) {
    return this.findByIdAndDelete(request)
}

friendshipSchema.statics.cancelFriendship = async function (user: ID, friend: ID[]) {
    await this.deleteMany({
        '$or': [
            { requester: user, requested: { "$in": friend } },
            { requested: user, requester: { "$in": friend } }
        ],
        status: 'Accepted'
    })

    return friend
}

friendshipSchema.statics.getFriends = function (user: ID) {
    return this.find({
        '$or': [{ requester: user }, { requested: user }],
        status: 'Accepted'
    }).then(friendship => friendship.map(
        ({ requester, requested }) =>
            requester == user ? requested : requester
    ))
}

friendshipSchema.statics.areFriends = async function (user1: ID, user2: ID) {
    const personMatch = await this.find({
        '$or': [{ requester: user1, requested: user2 }, { requested: user1, requester: user2 }],
        status: 'Accepted'
    })
    return personMatch.length ? true : false
}

friendshipSchema.statics.arePendingFriendship = async function (requester: ID, requested: ID) {
    const personMatch = await this.find({
        requester, requested, status: 'Pending'
    })
    return personMatch.length ? true : false
}

const Friendship = model<FriendshipDocument, FriendshipModel>('Friendship', friendshipSchema)

export default Friendship