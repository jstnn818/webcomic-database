const mongoose = require('mongoose')
//const Image = require('./imageModel')

const Schema = mongoose.Schema

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pages: [String] //Image.schema
}, { timestamps: true })

module.exports = mongoose.model('Chapter', chapterSchema)