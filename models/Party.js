const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    oids: {
        type: {}
    },
    type: {
        type: String,
        default: 'natural',
        enum: ['natural', 'nonNatural', 'baUnit', 'group']
    },
    details: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Party', PartySchema)