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
        const getToday = (today.getDate()+1+'/'+today.getMonth())

        const findData = await SupervisorSchedule.find({ supervisorId: supervisorId })
        // var destination; 
        console.log(findData);
        if(findData !== []) {
            const findDate = (new Date(findData[findData.length].date)).getDate()+'/'+(new Date(findData[findData.length].date)).getMonth();
            // console.log(findDate);
        }


        // const listBook = [];
        // const listRegister = await registerBus.findOne({ parentsId: parentsId })
        // if(listRegister !== null) {
        //     listRegister.listBookStation.map(value => {
        //         const getDate = (new Date(value.date)).getDate()+'/'+(new Date(value.date)).getMonth();
        //         if(getToday === getDate && type === "OnBus") {
        //             listBook.push({
        //                 ...value,
        //             })
        //         } else if(getToday === getDate && type === "OutBus") {
        //             listBook.push({
        //                 ...value,

        //             })
        //         } else {

        //         }
        //     });
        // }
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