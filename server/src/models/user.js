const mongoose = require('mongoose')
const joi = require('joi')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 6) {
                    throw new Error('Password Length Not Sufficent')
                }
            },
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate(email) {
                const { error } = joi
                    .object({ email: joi.string().email() })
                    .validate({ email })
                if (error) throw error
            },
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
