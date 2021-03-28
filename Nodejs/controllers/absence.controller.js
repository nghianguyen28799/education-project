const Absence = require("../models/absence.model");
const { response } = require("../routes/index.route");

module.exports = {
    create: async (req, res) => { 
        const parentsId = req.body.id
        const absenceApp = req.body.absenceApp
        const reason = req.body.reason;
        console.log(parentsId);
        console.log(absenceApp);
        console.log(reason);
        Absence.create(
        {
            parentsId: parentsId,
            dates: absenceApp,
            reason: reason
        }
        ).then(() => {
            console.log('create');
            res.send({ create: true})
         })
    },

    show: async (req, res) => {
        // const parentsId = req.body.id;
        // // console.log(parentsId);
        // const listRegister = await registerBus.findOne({ parentsId: parentsId })
        // res.send(listRegister)
    }
}