import { Schema, model, Document, Model } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { ChatDocument, UserDocument } from '../types'

const userSchema = new Schema<UserDocument, Model<UserDocument>, UserDocument>({
    nickname: {
        type: String,
        required: [true, "Обязательное поле"],
        minlength: [3, "Nickname должен содержать не менее 3-х символов"],
        maxlength: [20, "Nickname должен содержать не более 20-ти символов"]
    },
    password: {
        type: String,
        required: [true, "Обязательное поле"],
        validate: {
            validator: (pass: string) => /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/g.test(pass),
            message: () => `Пароль должен содержать число, буквы верхнего и нижнего регистра`
        }
    },
    email: {
        type: String,
        required: [true, "Обязательное поле"],
        validate: [{
            validator: (email: string) => /.@.+\../.test(email),
            message: props => `${props.value} некорректен`
        }, {
            validator: async (email: string): Promise<boolean> =>
                !(await User.exists({ email })),
            message: () => `Email уже используется`
        }]
    },
    avatar: { type: String, default: "https://res.cloudinary.com/dlajqlyky/image/upload/v1627144864/avatar-1577909_1280_zyjtyw.png" },
    isOnline: { type: Boolean, default: false },
    // @ts-ignore 
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
}, {
    timestamps: true,
})

userSchema.pre('save', async function () {
    if (this.isModified('password'))
        this.password = await hash(this.password, 10)
})

userSchema.methods.matchesPassword = function (password: string) {
    return compare(password, this.password)
}

const User = model<UserDocument, Model<UserDocument>>('User', userSchema)

export default User