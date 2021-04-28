const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noAttendanceSchema = new Schema({
    classCode: {
        type: String,
        required: true,
    },
    studentList: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

var NoAttendance = mongoose.model('NoAttendance', noAttendanceSchema, 'noAttendance');

module.exports = NoAttendance
