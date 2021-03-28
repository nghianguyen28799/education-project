const { find } = require("../models/supervisorSchedule.model");
const SupervisorSchedule = require("../models/supervisorSchedule.model");

module.exports = {
    start: async(req, res) => {
        const id = req.body.id;
        const getStatus = req.body.status;
        const today = new Date();
        const findData = await SupervisorSchedule.find({ supervisorId: id })    
        var newData = {
            supervisorId: id,
            date: today,
            status: {
                getOnBus: true,
                getOutBus: false,
            },
            gps: {test: '12321'},
            process: {
                destination: 1,
                status: true
            }
        }
        if(findData === []) {
            await SupervisorSchedule.create(newData)
            res.send(newData)
            console.log('1');
        } else {
            const getDate = findData[findData.length-1].date.getDate()+"/"+findData[findData.length-1].date.getMonth()
            const getDateToday = today.getDate()+"/"+today.getMonth()    
            console.log(getDate, getDateToday);
            if(getDate === getDateToday) {
                const condition = {
                    _id: findData[findData.length-1]._id,
                }
                if(getStatus === "OnBus" && findData[findData.length-1].process.destination === 1) {
                    var handler = {
                        status: {
                            getOnBus: true,
                            getOutBus: findData[findData.length-1].status.getOutBus,
                        },
                        process: {
                            destination: 2,
                            status: true
                        }
                    }
                } else if(getStatus === "OutBus") {
                    var handler = {
                        status: {
                            getOnBus: findData[findData.length-1].status.getOnBus,
                            getOutBus: true,
                        }
                    }
                }
                await SupervisorSchedule.updateOne(condition, handler)
                .then(() => {
                    res.send({ update: true })
                }) 
            } else {
                await SupervisorSchedule.create(newData)
                res.send(newData)
            }          
        }
    },

    end: async(req, res) => {
        const id = req.body.id;
        const getStatus = req.body.status;
        const today = new Date();
        const findData = await SupervisorSchedule.find({ supervisorId: id })
        const getDate = findData[findData.length-1].date.getDate()+"/"+findData[findData.length-1].date.getMonth()
        const getDateToday = today.getDate()+"/"+today.getMonth()    
        if(getDate === getDateToday) {
            const condition = {
                _id: findData[findData.length-1]._id,
            }
            if(getStatus === "OnBus") {
                var handler = {
                    status: {
                        getOnBus: false,
                        getOutBus: findData[findData.length-1].status.getOutBus,
                    },
                }

            } else if(getStatus === "OutBus" && findData[findData.length-1].process.destination === 1) {
                var handler = {
                    status: {
                        getOnBus: findData[findData.length-1].status.getOnBus,
                        getOutBus: false,
                    },
                    process: {
                        destination: 1,
                        status: false
                    }
                }
            } else if(getStatus === "OutBus" && findData[findData.length-1].process.destination === 2) {
                var handler = {
                    status: {
                        getOnBus: findData[findData.length-1].status.getOnBus,
                        getOutBus: false,
                    },
                    process: {
                        destination: 2,
                        status: false
                    }
                }
            }
            await SupervisorSchedule.updateOne(condition, handler)
            .then(() => {
                res.send({ update: true })
            }) 
        } else {
            await SupervisorSchedule.create(newData)
            res.send(newData)
        }         
    },

    show: async(req, res) => {
        const id = req.body.id
        const today = new Date();
        const findData = await SupervisorSchedule.find({ supervisorId: id })
        if(findData !== []) {
            const getDate = findData[findData.length-1].date.getDate()+"/"+findData[findData.length-1].date.getMonth()
            const getDateToday = today.getDate()+"/"+today.getMonth()    
            if(getDate === getDateToday) {
                res.send(findData[findData.length-1])
            }
        }
    },

    showDestination: async(req, res) => {
        const id = req.body.id
        // console.log(id);
        const findData = await SupervisorSchedule.find({ supervisorId: id })
        if(findData !== []) {
            res.send(findData[findData.length-1])
        }
    }
}