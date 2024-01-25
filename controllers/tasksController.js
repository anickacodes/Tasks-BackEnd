// importing Express
const express = require('express')
// Creating an instance of a Router
const tasks = express.Router()
// Importing db query functions
const { getTasks, getOneTask, createTask, updateTask, deleteTask } = require('../queries/tasks')

tasks.get('/', async (req, res) => {
    try {
        const tasks = await getTasks()
        res.status(200).json(tasks)
    }catch (err) {
        res.status(404).json({error: err})
    }
})

tasks.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const task = await getOneTask(id)
        res.status(200).json(task)
    } catch (err) {
        res.status(404).json({error: err})
    }
})

tasks.post('/', async (req, res) => {
    try {
        const createdTask = await createTask(req.body)
        res.status(201).json(createdTask)
    } catch (err) {
        res.status(500).json({error: "Internal Controller Server Error"})
    }
})

tasks.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(404).json({ error: err})
    }
})

tasks.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await deleteTask(id)
        res.status(200).json({ success: "Successfully deleted task"})
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

module.exports = tasks