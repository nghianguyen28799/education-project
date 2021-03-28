const Schedule = require("../models/schedule.model");

module.exports = {
    create: async(req, res) => {
        const ClassId = req.body.classCode;
        const DayList = req.body.data;

        await Schedule.findOne({ ClassId: ClassId })
        .then(data => {
            if(data === null) {
                Schedule.create({
                    ClassId: ClassId,
                    DayList: DayList
                }).then(() => {
                    console.log('create');
                    res.send({ create: true })
                })
            }
        })
    },

    show: async(req, res) => {
        const ClassId = req.body.classCode
        
        await Schedule.findOne({
            ClassId: ClassId
        })
        .then(data => {
            res.send(data);
        })
    },

    edit: async(req, res) => {
        const ClassId = req.body.classCode;
        const DayList = req.body.data;
        
        const condition = {
            ClassId: ClassId
        }

        const handler = {
            DayList: DayList
        }

        await Schedule.updateOne(condition, handler)
        .then(() => {
            res.send({ update: true })
        })
    }

}