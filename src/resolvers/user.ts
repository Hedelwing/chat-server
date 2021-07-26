import { User } from '../models'
import { signIn } from '../utils/auth'
import { setTokens } from '../utils/auth'
import { ApolloError } from 'apollo-server-errors'
import cloudinary from 'cloudinary'
import Friendship from '../models/friendship'

cloudinary.v2.config({
    cloud_name: 'dlajqlyky',
    api_key: '478439327858342',
    api_secret: 'nEt1XseNpTuUTCORdlDYFfvCIoU'
})

export default {
    Query: {
        me: (_, __, { user }) => User.findById(user),
        user: (_, { id }) => User.findById(id),
        users: (_, { searched }, { user }) => {
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
        signUp: (_, args) => User.create(args).then(user => setTokens(user)),
        signIn: (_, args) => signIn(args).then(user => setTokens(user)),
        signOut: async (_, __, { user }) => {
            await User.updateOne({ _id: user }, { isOnline: false })

            return true
        },
        uploadAvatar: async (_, { file }, { user }) => {
            const { createReadStream } = await file

            const result: cloudinary.UploadApiResponse = await new Promise((res, rej) =>
                createReadStream()
                    .pipe(cloudinary.v2.uploader.upload_stream(
                        {
                            tags: "avatar",
                            public_id: user,
                            allowed_formats: ["png", "jpg", "webp"],
                            format: "jpg",
                            eager: { width: 200, height: 200, crop: "fill" }
                        },
                        (error, result) => {
                            if (error) throw new ApolloError("Не удалось загрузить изображение")

                            res(result)
                        }
                    ))
            )

            await User.findByIdAndUpdate(user, { avatar: result?.eager[0]?.secure_url })

            return true
        },
    },
    User: {
        areFriends: ({ _id }, __, { user }) => Friendship.areFriends(_id, user),
        isMe: ({ _id }, __, { user }) => _id === user,
        areRequesterFriendship: ({ _id }, __, { user }) => Friendship.arePendingFriendship(_id, user),
        areRequestedFriendship: ({ _id }, __, { user }) => Friendship.arePendingFriendship(user, _id),
    }
}