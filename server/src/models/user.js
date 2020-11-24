const mongoose = require('mongoose')
const Config = require('../../config')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    typeAccount: {
        type: Number,
        default: Config.MEMBER_ACCOUNT
    },
    money: {
        type: Number
    },
    cardNumber: {
        type: String,
        unique: true
    },
    date: {
        type: Number,
        required: true,
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User