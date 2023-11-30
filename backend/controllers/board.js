const express = require("express")

const router = express.Router()

// GET all boards
router.get('/', (req, res) => {
    res.json({mssg: "GET all boards"})
})

// GET single board
router.get('/:id', (req, res) => {
    res.json({mssg: "GET a single board"})
})

// POST new board
router.post('/', (req, res) => {
    res.json({mssg: "POST a new board"})
})

// DELETE an board
router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE an board"})
})

// UPDATE an board
router.patch('/:id', (req, res) => {
    res.json({mssg: "PATCH an board"})
})

module.exports = router