const { find } = require("../models/supervisorSchedule.model");
const SupervisorSchedule = require("../models/supervisorSchedule.model");

module.exports = {
    start: async(req, res) => {
        const id = req.body.id;
        const getStatus = req.body.status;
        const today = new Date();
        const findData = await SupervisorSchedule.findOne({ supervisorId: id })    
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
        if(!findData) {
            await SupervisorSchedule.create(newData)
            res.send(newData)
        } else {
            const getDate = findData.date.getDate()+"/"+findData.date.getMonth()
            const getDateToday = today.getDate()+"/"+today.getMonth()    
            const condition = {
                _id: findData._id,
            }
            if(getDate === getDateToday) {
                if(getStatus === "OnBus" && findData.process.destination === 1) {
                    var handler = {
                        status: {
                            getOnBus: true,
                            getOutBus: findData.status.getOutBus,
                        },
                        process: {
                            destination: 2,
                            status: true
                        }
                    }
                } else if(getStatus === "OutBus") {
                    var handler = {
                        status: {
                            getOnBus: findData.status.getOnBus,
                            getOutBus: true,
                        }
                    }
                }
                await SupervisorSchedule.updateOne(condition, handler)
                .then(() => {
                    SupervisorSchedule.findOne({ supervisorId: id })
                    .then(data => {
                        res.send(data)
                    })
                }) 
            } else {
                await SupervisorSchedule.updateOne(condition, newData)
                .then(() => {
                    SupervisorSchedule.findOne({ supervisorId: id })
                    .then((data) => {
                        res.send(data)
                    })
                })
            }          
        }
    },

    end: async(req, res) => {
        const id = req.body.id;
        const getStatus = req.body.status;
        const today = new Date();
        const findData = await SupervisorSchedule.findOne({ supervisorId: id })
        const getDate = findData.date.getDate()+"/"+findData.date.getMonth()
        const getDateToday = today.getDate()+"/"+today.getMonth()    
        if(getDate === getDateToday) {
            const condition = {
                _id: findData._id,
            }
            if(getStatus === "OnBus") {
                var handler = {
                    status: {
                        getOnBus: false,
                        getOutBus: findData.status.getOutBus,
                    },
                }

            } else if(getStatus === "OutBus" && findData.process.destination === 1) {
                var handler = {
                    status: {
                        getOnBus: findData.status.getOnBus,
                        getOutBus: false,
                    },
                    process: {
                        destination: 1,
                        status: false
                    }
                }
            } else if(getStatus === "OutBus" && findData.process.destination === 2) {
                var handler = {
                    status: {
                        getOnBus: findData.status.getOnBus,
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
                SupervisorSchedule.findOne({ supervisorId: id })
                .then(data => {
                    res.send(data)
                })   
            }) 

        } else {
            await SupervisorSchedule.create(newData)
            res.send(newData)
        }         
    },

    show: async(req, res) => {
        const id = req.body.id
        const today = new Date();
        const findData = await SupervisorSchedule.findOne({ supervisorId: id })

        if(findData) {
            const getDate = findData.date.getDate()+"/"+findData.date.getMonth()
            const getDateToday = today.getDate()+"/"+today.getMonth()    
            if(getDate === getDateToday) {
                res.send(findData)
            }
        }
    },

    showDestination: async(req, res) => {
        const id = req.body.id
        // console.log(id);
        const findData = await SupervisorSchedule.findOne({ supervisorId: id })
        if(findData) {
            res.send(findData)
        } else {
            res.send({})
        }
    }
}