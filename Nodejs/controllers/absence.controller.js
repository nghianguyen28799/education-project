const Absence = require("../models/absence.model");
const Student = require("../models/student.model");
const { response } = require("../routes/index.route");

module.exports = {
    create: async (req, res) => { 
        const parentsId = req.body.id
        const absenceApp = req.body.absenceApp
        const reason = req.body.reason;
        const classCode = req.body.classCode
        Absence.create(
        {
            parentsId: parentsId,
            dates: absenceApp,
            reason: reason,
            classCode: classCode
        }
        ).then(() => {
            res.send({ create: true})
         })
    },

    show: async (req, res) => {
        const classCode = req.body.classCode;
        const list = await Absence.find({ classCode: classCode })
        const data = [];
        await list.map(item1 => {
            item1.dates.map(item2 => {
                if ((new Date(item2.date)).getDate()+'/'+(new Date(item2.date)).getMonth() === new Date().getDate()+'/'+new Date().getMonth()) {
                    data.push({
                        parentsId: item1.parentsId,
                        lessons: item2.lesson,
                        reason: item1.reason
                    })
                }
            })
        })
        res.send(data)
    },

    getData: async(req, res) => {
        Absence.find().then(data => res.send(data))
    }
}