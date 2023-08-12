const express = require('express')
const { 
    getSeries,
    getOneSeries,
    createSeries,
    deleteSeries,
    updateSeries 
} = require('../controllers/seriesController')
const router = express.Router()

// GET all workouts
router.get('/', getSeries)

// GET single workout
router.get('/:id', getOneSeries)

// POST new workout
router.post('/', createSeries)

// DELETE new workout
router.delete('/:id', deleteSeries)

// UPDATE a workout
router.patch('/:id', updateSeries)

module.exports = router