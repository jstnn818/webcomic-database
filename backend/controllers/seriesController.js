const Series = require('../models/seriesModel')
const Chapter = require('../models/chapterModel')
const Image = require('../models/imageModel')
const mongoose = require('mongoose')

//get all series
const getSeries = async (req, res) => {
    const series = await Series.find({}).sort({createdAt: -1})
    res.status(200).json(series)
}

//get a series
const getOneSeries = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findById(id)
    if (!series) {
        return res.status(404).json({error: 'No such series'})
    }
    res.status(200).json(series)
}
 

//create a series
const createSeries = async (req, res) => {
    const {title, author, cover} = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!cover) {
        emptyFields.push('cover')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the empty fields', emptyFields})
    }

    // add doc to db
    try {
        const series = await Series.create({title, author, cover})
        res.status(200).json(series)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a series
const deleteSeries = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findOneAndDelete({_id: id})
    if (!series) {
        return res.status(404).json({error: 'No such series'})
    }

    const cover = await Image.findOneAndDelete({_id: series.cover})
    if (!cover) {
        return res.status(404).json({error: 'No such cover'})
    }

    for (const chapterId of series.chapters) {
        const chapter = await Chapter.findById(chapterId)
        if (chapter) {
            await Image.deleteMany({ _id: { $in: chapter.pages } })
        }
    }
    const deletedChapters = await Chapter.deleteMany({ _id: { $in: series.chapters } })

    res.status(200).json({
        series,
        deletedChapters,
    })
}

//update a series
const updateSeries = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such series'})
    }

    const series = await Series.findOneAndUpdate({_id: id}, {
        ...req.body
    }, { new: true })

    if (!series) {
        return res.status(404).json({error: 'No such series'})
    }
    res.status(200).json(series)
}

module.exports = {
    getSeries,
    getOneSeries,
    createSeries,
    deleteSeries,
    updateSeries
}