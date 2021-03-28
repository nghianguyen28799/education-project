const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    ClassId: {
        type: String,
        required: true,
    },

    DayList: {
        type: Object,
        required: false,
    }
})

var Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule
