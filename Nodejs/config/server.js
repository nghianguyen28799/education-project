const express = require('express')
const app = express()
const port = process.env.PORT;

const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.listen(port)
  
const Route = require("../routes/index.route");

app.use(Route)

module.exports = app