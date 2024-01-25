// importing Express
const express = require('express')
// Creating an instance of a Router
const tasks = express.Router()
// Importing db query functions
const { getTasks } = require('../queries/tasks')

//GET all tasks
tasks.get('/', async (req, res) => {
    try {
        const tasks = await getTasks()
        res.status(200).json(tasks)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

module.exports = tasks