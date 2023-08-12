const Chapter = require('../models/chapterModel')
const Image = require('../models/imageModel')
const mongoose = require('mongoose')

//get all chapters
const getChapters = async (req, res) => {
    const chapters = await Chapter.find({}).sort({createdAt: -1})
    res.status(200).json(chapters)
}

//get a chapter
const getChapter = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such chapter'})
    }

    const chapter = await Chapter.findById(id)
    if (!chapter) {
        return res.status(404).json({error: 'No such chapter'})
    }
    res.status(200).json(chapter)
}

//create a chapter
const createChapter = async (req, res) => {
    const {title, number, pages} = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!number) {
        emptyFields.push('number')
    }
    if (!pages || pages.length === 0) {
        emptyFields.push('pages')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the empty fields', emptyFields})
    }

    // add doc to db
    try {
        const chapter = await Chapter.create({title, number, pages})
        res.status(200).json(chapter)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a chapter
const deleteChapter = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such chapter'})
    }

    const chapter = await Chapter.findOneAndDelete({_id: id})
    if (!chapter) {
        return res.status(404).json({error: 'No such chapter'})
    }

    const deletedPages = await Image.deleteMany({ _id: { $in: chapter.pages } })

    res.status(200).json({
        chapter,
        deletedPages,
    })
}

//update a chapter
const updateChapter = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such chapter'})
    }

    const chapter = await Chapter.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!chapter) {
        return res.status(404).json({error: 'No such chapter'})
    }
    res.status(200).json(chapter)
}

module.exports = {
    getChapters,
    getChapter,
    createChapter,
    deleteChapter,
    updateChapter
}