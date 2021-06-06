const SupervisorSchedule = require("../models/supervisorSchedule.model");
const registerBus = require("../models/registerBus.model");
const { response } = require("../routes/index.route");

module.exports = {
    create: async (req, res) => { 
        const {data} = req.body;
        const { parentsId, supervisorId, station, startDate, endDate } = data

        const registerData = await registerBus.findOne({ parentsId: parentsId })
        if(registerData === null) {
             registerBus.create(
                {
                    parentsId: parentsId,
                    supervisorId: supervisorId,
                    supervisorIdTemp: supervisorId,
                    date: new Date(),
                    station: station,
                    startDate: startDate,
                    endDate:endDate,
                    getOnBusFromHouse: false,
                    getOutBusFromHouse: false,
                    getOnBusFromSchool: false,
                    getOutBusFromSchool: false,
                    otherRequirement: new Date(new Date().setDate(new Date().getDate()-1))
                },
             ).then(() => {
                res.send({ create: true})
            })
        } else {
            // const now = new Date().getDate()+new Date().getMonth();
            // const getDate = (new Date(registerData.date)).getDate()+(new Date(registerData.date)).getMonth();
            // const check = now == getDate;

            const condition = {
                parentsId: parentsId,
            }
            
            const handler = {
                supervisorId: supervisorId,
                station: station,
                startDate: startDate,
                endDate: endDate,
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
            if(destination === 1 && type === "OnBus") {
                registerBus.updateOne({ parentsId: parentsId }, { getOnBusFromHouse: true })
                .then(() => {
                    res.sendStatus(200)
                })
            } else if(destination === 1 && type === "OutBus") {
                registerBus.updateOne({ parentsId: parentsId }, { getOutBusFromHouse: true })
                .then(() => {
                    res.sendStatus(200)
                })
            } else if(destination === 2 && type === "OnBus") {
                registerBus.updateOne({ parentsId: parentsId }, { getOnBusFromSchool: true })
                .then(() => {
                    res.sendStatus(200)
                })
            } else if(destination === 2 && type === "OutBus") {
                registerBus.updateOne({ parentsId: parentsId }, { getOutBusFromSchool: true })
                .then(() => {
                    res.sendStatus(200)
                })
            }
        }
    },

    show: async (req, res) => {
        const parentsId = req.body.id;
        // console.log(parentsId);
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        res.send(listRegister)
    },

    showAllList: async(req, res) => {
        await registerBus.find({ supervisorId: req.body.id })
        .then(async (list) => {
            const data = await list.filter(item => {
                if((new Date(item.endDate)).getMonth() > new Date().getMonth() && (new Date(item.startDate)).getMonth() < new Date().getMonth()) {
                    return true;
                } 
                else if((new Date(item.endDate)).getMonth() > new Date().getMonth() && (new Date(item.startDate)).getMonth() == new Date().getMonth()) {
                    if((new Date(item.startDate)).getDate() <= new Date().getDate()) {
                        return true
                    } else return false
                }
                else if((new Date(item.endDate)).getMonth() == new Date().getMonth() && (new Date(item.startDate)).getMonth() <= new Date().getMonth()) {
                    if((new Date(item.startDate)).getDate() <= new Date().getDate()) {
                        return true
                    } else return false
                } 
                else {
                    return false
                }
            })
            res.send(data);
        })
    },

    updateDate: async(req, res) => {
        const parentsId = req.body.id;
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        const now = new Date().getDate()+new Date().getMonth();
        const getDate = (new Date(listRegister.date)).getDate()+(new Date(listRegister.date)).getMonth();
        if(now != getDate) {
            registerBus.updateOne(
                { parentsId: parentsId },
                { 
                    supervisorIdTemp: listRegister.supervisorId,
                    date: new Date(),
                    getOnBusFromHouse: false,
                    getOutBusFromHouse: false,
                    getOnBusFromSchool: false,
                    getOutBusFromSchool: false,
                }
            ). then(() => {
                res.send({ 
                    getOnBusFromHouse: false,
                    getOutBusFromHouse: false,
                    getOnBusFromSchool: false,
                    getOutBusFromSchool: false,
                 })
            })
        } else {
            res.send({ 
                getOnBusFromHouse: listRegister.getOnBusFromHouse,
                getOutBusFromHouse: listRegister.getOutBusFromHouse,
                getOnBusFromSchool: listRegister.getOnBusFromSchool,
                getOutBusFromSchool: listRegister.getOutBusFromSchool,
             })
        }
    },

    sendRequire: async (req, res) => {
        const parentsId = req.body.id;
        // console.log(parentsId);
        const listRegister = await registerBus.findOne({ parentsId: parentsId })
        let check = false;
        if(listRegister) {
            if((new Date(listRegister.endDate)).getMonth() > new Date().getMonth() && (new Date(listRegister.startDate)).getMonth() < new Date().getMonth()) {
                check = true;
            } 
            else if((new Date(listRegister.endDate)).getMonth() > new Date().getMonth() && (new Date(listRegister.startDate)).getMonth() == new Date().getMonth()) {
                if((new Date(listRegister.startDate)).getDate() <= new Date().getDate()) {
                    check = true
                } else check = false
            }
            else if((new Date(listRegister.endDate)).getMonth() == new Date().getMonth() && (new Date(listRegister.startDate)).getMonth() <= new Date().getMonth()) {
                if((new Date(listRegister.startDate)).getDate() <= new Date().getDate()) {
                    check = true
                } else check = false
            } 
            else {
                check = false
            }
            // console.log(check);
            if(check) {
                registerBus.updateOne({ parentsId: parentsId }, {otherRequirement: new Date()})
                .then(() => {
                    res.send({ success: check })
                })
            } else {
                res.send({ success: false});
            }  
        }  else {
            res.send({ success: false});
        }
    },

    showByIdAndDate: async(req, res) => {
        const { dataObj } = req.body;
        // console.log(dataObj);
        const getData = await registerBus.findOne({ parentsId: dataObj.parentsCode })
        const now = (new Date()).getDate() + (new Date()).getMonth()+(new Date()).getYear();
        if(getData == null) {
            return res.send({ ...dataObj, status: 0 });
        }
        const data = getData.listBookStation.filter(item => {
            const date = (new Date(item.date)).getDate() + (new Date(item.date)).getMonth() + (new Date(item.date)).getYear();
            return now == date;
        })
        if(data.length == 0) {
            res.send({ ...dataObj, status: 1 });
        } else {
            res.send({ ...dataObj, status: 2 });
        }
    }
}