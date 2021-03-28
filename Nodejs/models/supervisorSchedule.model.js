const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supervisorScheduleSchema = new Schema({
    supervisorId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: {
            getOnBus: Boolean,
            getOutBus: Boolean
        },
        required: true,
    },
    gps: {
        type: Object,
        required: true,
    },

    process: {
        type: {
            description: Number,
            status: Boolean,
        },  
        required: true,
    }
})

var SupervisorSchedule = mongoose.model('SupervisorSchedule', supervisorScheduleSchema);

module.exports = SupervisorSchedule
