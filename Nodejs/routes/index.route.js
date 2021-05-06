const express = require('express')
const app = express();

const UsersRoute = require("./users.route");
const ClassRoute = require("./class.route");
const TeacherRoute = require('./teacher.route');
const StudentRoute = require('./student.route')
const ChatRoute = require('./chat.route')
const StationRoute = require('./station.route')
const RegisterBusRoute = require('./registerBus.route')
const AbsenceRoute = require('./absence.route')
const ScheduleRoute = require('./schedule.route')
const HistoryRoute = require('./history.route')
const BusRoute = require('./bus.route')
const SupervisorSchedule = require('./supervisorSchedule.route')
const NoAttendance = require('./noAttendance.route')
const Notification = require('./notification.route')
const Rating = require('./rating.route')

app.use('/users', UsersRoute);
app.use('/class', ClassRoute);
app.use('/teacher', TeacherRoute)
app.use('/student', StudentRoute)
app.use('/chat', ChatRoute)
app.use('/station', StationRoute)
app.use('/registerbus', RegisterBusRoute)
app.use('/absence', AbsenceRoute)
app.use('/schedule', ScheduleRoute)
app.use('/history', HistoryRoute)
app.use('/bus', BusRoute)
app.use('/supervisorschedule', SupervisorSchedule)
app.use('/noattendance', NoAttendance)
app.use('/notification', Notification)
app.use('/rating', Rating)



module.exports = app;