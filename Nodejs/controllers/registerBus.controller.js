const SupervisorSchedule = require("../models/supervisorSchedule.model");
const registerBus = require("../models/registerBus.model");
const { response } = require("../routes/index.route");

module.exports = {
    create: async (req, res) => { 
        const parentsId = req.body.id
        const listBookRegister = req.body.listBookRegister
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        if(listRegister === null) {
             registerBus.create(
                {
                    parentsId: parentsId,
                    listBookStation: listBookRegister
                },
             ).then(() => {
                 console.log('create');
                res.send({ create: true})
            })
        } else {
            const condition = {
                parentsId: parentsId,
            }
            const handler = {
                listBookStation: listBookRegister
            }
            registerBus.updateOne(condition, handler)
            .then(() => {
                console.log('update');
                res.send({ update: true })
            })
        }
    },

    attendance: async (req, res) => {
        const parentsId = req.body.id;
        const type = req.body.type;
        const supervisorId = req.body.supervisorId
        const today = new Date();
        // const getToday = (today.getDate()+1+'/'+today.getMonth())
        var findDateNew;
        var destination;
        const findData = await SupervisorSchedule.findOne({ supervisorId: supervisorId })
        if(findData) {
            findDateNew = (new Date(findData.date)).getDate()+'/'+(new Date(findData.date)).getMonth();
            destination = findData.process.destination
        }

        const listBook = [];
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        if(listRegister !== null) {
            listRegister.listBookStation.map(value => {
                const getDate = (new Date(value.date)).getDate()+'/'+(new Date(value.date)).getMonth();
                // console.log(value);
                if(findDateNew === getDate ) {
                    if(destination === 1 && type === "OnBus") {
                        listBook.push({
                            _id: value._id,
                            date: value.date,
                            station: value.station,
                            getOnBusFromHouse: true,
                            getOutBusFromHouse: value.getOutBusFromHouse,
                            getOnBusFromSchool: value.getOnBusFromSchool,
                            getOutBusFromSchool: value.getOutBusFromSchool
                        })
                    } else if(destination === 1 && type === "OutBus") {
                        listBook.push({
                            _id: value._id,
                            date: value.date,
                            station: value.station,
                            getOnBusFromHouse: value.getOnBusFromHouse,
                            getOutBusFromHouse: true,
                            getOnBusFromSchool: value.getOnBusFromSchool,
                            getOutBusFromSchool: value.getOutBusFromSchool
                        })
                    } else if(destination === 2 && type === "OnBus") {
                        listBook.push({
                            _id: value._id,
                            date: value.date,
                            station: value.station,
                            getOnBusFromHouse: value.getOnBusFromHouse,
                            getOutBusFromHouse: value.getOutBusFromHouse,
                            getOnBusFromSchool: true,
                            getOutBusFromSchool: value.getOutBusFromSchool
                        })
                    } else if(destination === 2 && type === "OutBus") {
                        listBook.push({
                            _id: value._id,
                            date: value.date,
                            station: value.station,
                            getOnBusFromHouse: value.getOnBusFromHouse,
                            getOutBusFromHouse: value.getOutBusFromHouse,
                            getOnBusFromSchool: value.getOnBusFromSchool,
                            getOutBusFromSchool: true
                        })
                    }
                } else {
                    listBook.push(value)
                }
            });
        }
        registerBus.updateOne({ parentsId: parentsId }, { listBookStation: listBook })
        .then(() => {
            res.send(200)
        })
    },

    show: async (req, res) => {
        const parentsId = req.body.id;
        // console.log(parentsId);
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        res.send(listRegister)
    },

    showAllList: async(req, res) => {
        await registerBus.find()
        .then(data => {
            res.send(data)
        })
    } 
}