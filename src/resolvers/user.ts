import { User } from '../models'
import { signIn } from '../utils/auth'
import { setTokens } from '../utils/auth'
import cloudinary from 'cloudinary'
import Friendship from '../models/friendship'
import { IResolvers } from 'apollo-server-express'
import uploadImage from '../utils/uploadFile'
import { UserDocument } from '../types'

cloudinary.v2.config({
    cloud_name: 'dlajqlyky',
    api_key: '478439327858342',
    api_secret: 'nEt1XseNpTuUTCORdlDYFfvCIoU'
})

const UserResolve: IResolvers = {
    Query: {
        me: (_, __, { user }: { user: string }) => User.findById(user),
        user: (_, { id }: { id: string }) => User.findById(id),
        users: (_, { searched }: { searched: string }, { user }: { user: string }) => {
            const condition = searched
                ? {
                    '$or': [
                        { nickname: new RegExp(searched, 'i') },
                        { email: new RegExp(searched, 'i') },
                    ],
                }
                : {}

            const exception = {
                _id: { '$ne': user }
            }

            return User.find({ ...condition, ...exception })
        },
    },
    Mutation: {
        signUp: (_, args: any) => User.create(args).then((user) => setTokens(user.id)),
        signIn: (_, args: any) => signIn(args).then(user => setTokens(user.id)),
        signOut: async (_, __, { user }: { user: string }) => {
            await User.updateOne({ _id: user }, { isOnline: false })

            return true
        },
        uploadAvatar: async (_, { file }: any, { user }: { user: string }) => {
            const result = await uploadImage(file, {
                public_id: user,
                eager: { width: 200, height: 200, crop: "fill" }
            })

            await User.findByIdAndUpdate(user, { avatar: result.eager[0].secure_url })

            return true
        },
    },
    User: {
        areFriends: ({ _id }: UserDocument, __, { user }: { user: string }) =>
            Friendship.areFriends(_id, user),
        isMe: ({ _id }: UserDocument, __, { user }: { user: string }) =>
            _id === user,
        areRequesterFriendship: ({ _id }: UserDocument, __, { user }: { user: string }) =>
            Friendship.arePendingFriendship(_id, user),
        areRequestedFriendship: ({ _id }: UserDocument, __, { user }: { user: string }) =>
            Friendship.arePendingFriendship(user, _id),
    }
}

export default UserResolve