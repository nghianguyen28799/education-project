const express = require('express')
const app = express();

const UsersRoute = require("./users.route");
const ClassRoute = require("./class.route");
const TeacherRoute = require('./teacher.route');

app.use('/users', UsersRoute);
app.use('/class', ClassRoute);
app.use('/teacher', TeacherRoute)


module.exports = app;