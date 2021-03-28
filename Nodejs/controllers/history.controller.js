const History = require("../models/history.model");
const { response } = require("../routes/index.route");

module.exports = {
    create: async (req, res) => { 
        const parentsId = req.body.id;
        const event = req.body.event;
        const date = new Date()
        History.findOne({ parentsId: parentsId })
        .then(data => {
            if (data) {
                const condition = {
                    parentsId: parentsId,
                }
                const handler = {
                    events: [{name: event, date: date }, ...data.events],
                }

                History.updateOne(condition, handler)
                .then(() => {
                    // console.log('update history');
                    res.send({ update: true })
                })
            } else {
                History.create({
                    parentsId: parentsId,
                    events: { name: event, date: date },
                })
            }
        })
    },

    show: async (req, res) => {
        const parentsId = req.body.id;
        History.findOne({ parentsId: parentsId })
        .then(data => {
            res.send(data);
        })
    }
}