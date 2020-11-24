const mongoose = require('mongoose')
const Config = require('../../config')

const foodScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    }
})

foodScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Food = mongoose.model('Food', foodScheme)

module.exports = Food