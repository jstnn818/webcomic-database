const mongoose = require('mongoose')

const Schema = mongoose.Schema

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    chapters: [String]
}, { timestamps: true })

module.exports = mongoose.model('Series', seriesSchema)