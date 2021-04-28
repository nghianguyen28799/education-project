const { find } = require("../models/supervisorSchedule.model");
const NoAttendance = require("../models/NoAttendance.model");
const Student = require("../models/student.model");
const User = require("../models/users.model");

module.exports = {
    create: async(req, res) => {
        const parentsCodeList = [];
        await req.body.studentList.map(item => {
            parentsCodeList.push({
                name: item.data.name,
                parentsCode: item.data.parentsCode
            })
            Student.updateOne(
                { _id: item.data._id },
                {
                        attendanceStatus: false,
                        attendanceDay: new Date()
                }
            ).then(() => {})
        })

        const parentsData = []
        for(let value of parentsCodeList) {
            const isParents = await User.findOne({ _id: value.parentsCode })
            
            parentsData.push({
                parentsCode: value.parentsCode,
                tokens: isParents.tokens,
                name: value.name
            })
        }

        const tokensData = [];
        for(let value of parentsData) {
            value.tokens.length == 0
            ?
                tokensData.push({
                    parentsCode: value.parentsCode,
                    name: value.name,
                    tokens: []
                })
            :
            tokensData.push({
                parentsCode: value.parentsCode,
                name: value.name,
                tokens: value.tokens
            })
        }

        await NoAttendance.create({
            classCode: req.body.classCode,
            studentList: req.body.studentList,
            date: new Date()
        }).then(() => {
            res.send(tokensData)
        })
    },


    show: async(req, res) => {
        const classCode = req.body.classCode;
        const date = new Date();
        const data = await NoAttendance.findOne({ classCode: classCode})
        .sort({date: -1})
        if(data) {
            if((new Date(data.date)).getDate() == date.getDate()) {
                res.send(data)
            } else {
                res.send({})
            }
        }
    },

    editReason: async(req, res) => {
        const { classCode, parentsId, reason } = req.body 
        const fetchData = await NoAttendance.find({ classCode: classCode })
        .sort({ date: -1 }).limit(5)
        const data = fetchData.filter(item => {
            return new Date().getDate() === new Date(item.date).getDate()
        })
        // console.log(data[0].studentList);
        const newData = await data[0].studentList.map(item => {
            if(item.data.parentsCode !== parentsId) {
                return item
            } else {
                return {
                    ...item,
                    reason: reason
                }
            }
        })  
        const id = data[0]._id
        NoAttendance.updateOne({_id: id}, {studentList: newData})
        .then(() => res.sendStatus(200))
    },

    getData: async(req, res) => {
        const data = await NoAttendance.find()
        .sort({date: -1})
        res.send(data)
    }
}