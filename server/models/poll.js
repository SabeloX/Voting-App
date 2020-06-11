const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const pollSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    question: String,
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

const Poll = mongoose.model('poll', pollSchema)
module.exports = Poll