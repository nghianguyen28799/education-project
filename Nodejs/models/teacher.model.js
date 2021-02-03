const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    // Account: {
    //     type: String,
    //     requied: true,
    // },

    // Password: {
    //     type: String,
    //     required: true,
    // },

    Name: {
        type: String,
        required: true,
    },

    Avatar: {
        type: String,
        required: false,
    },

    BirthDay: {
        type: String,
        required: true,
    },

    Identification: {
        type: String,
        required: true
    },

    HomeTown: {
        type: String,
        required: true
    },
    
    Worked: {
        type: Number,
        required: true,
    }
})

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher


