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

// GET all series
router.get('/', getSeries)

// GET single series
router.get('/:id', getOneSeries)

// UPDATE a series
router.patch('/:id', updateSeries)

// Provide Auth for all Non-GET/PATCH requests
router.use(requireAuth)

// POST new series
router.post('/', createSeries)

// DELETE series
router.delete('/:id', deleteSeries)

module.exports = router