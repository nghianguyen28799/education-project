const express = require('express')
const app = express()
require('dotenv').config()

const server = require("./config/server");
const mongoDB = require("./config/mongo")
