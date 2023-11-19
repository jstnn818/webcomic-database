const express = require('express')
const multer = require('multer')
const { 
    getImages,
    getImage,
    createImage,
    deleteImage,
} = require('../controllers/imageController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

// Storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
// multer.memoryStorage() could use this and req.file.buffer under data too
// however, this is tempoary only. data loss when process ends
const Image = multer ({ storage: Storage })

// GET all images
router.get('/', getImages)

// GET single image
router.get('/:id', getImage)

// POST new image
router.post('/', Image.single('testImage'), createImage)

// DELETE an image
router.delete('/:id', deleteImage)

module.exports = router