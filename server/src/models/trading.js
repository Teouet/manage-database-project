const mongoose = require('mongoose')
const Config = require('../../config')

const tradingScheme = new mongoose.Schema({
    userSendId: {
        type: String,
        required: true,
        index : true
    },
    date: {
        type: Number,
        required: true,
        index : true
    },
    cardNumberReceive: {
        type: String,
        required: true,
        // index : true
    },
    money: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    }
})

tradingScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Trading = mongoose.model('Trading', tradingScheme)

module.exports = Trading