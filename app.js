const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require("morgan");
const usersController = require('./controllers/usersController.js')
// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use('/users', usersController)


app.get('/', (req, res) => {
    res.json({ index: "This is the index page" })
})


module.exports = app