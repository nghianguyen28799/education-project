const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const registerBusSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },
    supervisorId: {
        type: String,
        required: true,
    },
    supervisorIdTemp: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    station: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }, 
    getOnBusFromHouse:{
        type: Boolean,
        required: true,
    },
    getOutBusFromHouse: {
        type: Boolean,
        required: true,
    },
    getOnBusFromSchool: {
        type: Boolean,
        required: true,
    },
    getOutBusFromSchool:{
        type: Boolean,
        required: true,
    },
    
    otherRequirement: {
        type: Date,
        required: true,
    }
})

var RegisterBus = mongoose.model('RegisterBus', registerBusSchema);

module.exports = RegisterBus
