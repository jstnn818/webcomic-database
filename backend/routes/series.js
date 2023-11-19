const express = require('express')
const { 
    getSeries,
    getOneSeries,
    createSeries,
    deleteSeries,
    updateSeries 
} = require('../controllers/seriesController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

// GET all series
router.get('/', getSeries)

// GET single series
router.get('/:id', getOneSeries)

// POST new series
router.post('/', createSeries)

// DELETE series
router.delete('/:id', deleteSeries)

// UPDATE a series
router.patch('/:id', updateSeries)

module.exports = router