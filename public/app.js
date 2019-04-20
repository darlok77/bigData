const app = require('express')()
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const server = require('http').Server(app)

app.use(fileUpload())

server.listen(8080)

mongoose.connect('mongodb://localhost/csvimport', {'useNewUrlParser': true})

const upload = require('./upload.js')

app.get('/', upload.get)
