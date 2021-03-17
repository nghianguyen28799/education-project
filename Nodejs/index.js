const express = require('express')
const app = express()
var path = require('path');
require('dotenv').config()

// app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));;
// app.use('/upload',express.static(path.join(__dirname, '/upload')));

const server = require("./config/server");
const mongoDB = require("./config/mongo")
