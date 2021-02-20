const express = require('express')
const app = express();

const UsersRoute = require("./users.route");
const ClassRoute = require("./class.route");
const TeacherRoute = require('./teacher.route');
const StudentRoute = require('./student.route')
const ChatRoute = require('./chat.route')

app.use('/users', UsersRoute);
app.use('/class', ClassRoute);
app.use('/teacher', TeacherRoute)
app.use('/student', StudentRoute)
app.use('/chat', ChatRoute)

module.exports = app;