var http = require('http');
var app = require('express')();
var fileUpload = require('express-fileupload')
var mongoose = require('mongoose');
var csv = require('fast-csv');
var server = require('http').Server(app);

app.use(fileUpload());
 
server.listen(8080);

mongoose.connect('mongodb://localhost/csvimport', { useNewUrlParser: true });
 
var upload = require('./upload.js');
app.get('/', upload.get);
   