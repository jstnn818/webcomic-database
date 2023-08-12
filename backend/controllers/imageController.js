const Image = require('../models/imageModel')
const fs = require('fs')
const mongoose = require('mongoose')

//get FIRST image
const getImages = async (req, res) => {
    /*const images = await Image.find()
    res.status(200).json(images)*/

    // TEMP Collects IDs
    const images = await Image.find({}, '_id') 
    const imageIds = images.map(image => image._id)
    res.status(200).json(imageIds)
}

//get an image
const getImage = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such image'})
    }

    const image = await Image.findById(id)
    if (!image) {
        return res.status(404).json({error: 'No such image'})
    }
    res.status(200).json(image)
}

//create an image
const createImage = async (req, res) => {
    const saveImage = Image ({
        name: req.body.name,
        image: {
            data: fs.readFileSync("images/" + req.file.filename),
            contentType: req.file.mimetype
        } 
    })
    saveImage
    .save()
    .then(() => res.send(saveImage._id))
    .catch(err => console.log(err))
}

//delete an image
const deleteImage = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such image'})
    }

    const image = await Image.findOneAndDelete({_id: id})
    if (!image) {
        return res.status(404).json({error: 'No such image'})
    }
    res.status(200).json(image)
}

module.exports = {
    getImages,
    getImage,
    createImage,
    deleteImage,
}