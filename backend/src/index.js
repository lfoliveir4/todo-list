const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()


const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://lfoliveira:lfoliveira@cluster0-sb5kr.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const todoRoutes = require('./Routes')

app.use('/api', todoRoutes)
app.use(function (req, res, next) {
    res.send("Server ok")
    req.io = io

    next()
})

server.listen(3001)





