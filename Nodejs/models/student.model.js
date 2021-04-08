const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    classCode: {
        type: String,
        required: true,
    },
    teacherCode: {
        type: String,
        required: true,
    },
    
    parentsCode: {
        type: String,
        required: false,
    },

    joined: {
        type: String,
        required: true,
    },

    attendancedDay: {
        type: Date,
        required: false,
    },

    attendanceStatus: {
        type: Boolean,
        required: true,
    }
})

var Student = mongoose.model('Student', studentSchema);

module.exports = Student


