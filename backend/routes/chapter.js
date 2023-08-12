const express = require('express')
const { 
    getChapters,
    getChapter,
    createChapter,
    deleteChapter,
    updateChapter 
} = require('../controllers/chapterController')
const router = express.Router()

// GET all workouts
router.get('/', getChapters)

// GET single workout
router.get('/:id', getChapter)

// POST new workout
router.post('/', createChapter)

// DELETE new workout
router.delete('/:id', deleteChapter)

// UPDATE a workout
router.patch('/:id', updateChapter)

module.exports = router