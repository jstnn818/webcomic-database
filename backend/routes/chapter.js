const express = require('express')
const { 
    getChapters,
    getChapter,
    createChapter,
    deleteChapter,
    updateChapter 
} = require('../controllers/chapterController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

// GET all chapters
router.get('/', getChapters)

// GET single chapter
router.get('/:id', getChapter)

// POST new chapter
router.post('/', createChapter)

// DELETE chapter
router.delete('/:id', deleteChapter)

// UPDATE a chapter
router.patch('/:id', updateChapter)

module.exports = router