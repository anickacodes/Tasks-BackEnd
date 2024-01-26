const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require("morgan");

const tasksController = require('./controllers/tasksController')
const jwt = require('jsonwebtoken')
// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));

app.use('/tasks', tasksController)


app.get('/', (req, res) => {
    res.json({ index: "This is the index page" })
})

app.post('/login', (req, res)=> {
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

module.exports = app