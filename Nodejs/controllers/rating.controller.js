const Rating = require("../models/rating.model");

module.exports = {
    create: async(req, res) => {
        const { parentsId, studentId, title, content } = req.body;
        if(parentsId && studentId && title && content) {
            Rating.create({
                parentsId: parentsId, 
                studentId: studentId,
                title: title, 
                content: content
            })
            .then(() => res.sendStatus(200))
        } else {
            res.sendStatus(401)
        }
    },

    edit: async(req, res) => {
        
    },

    show: async(req, res) => {
        const id = req.body.id;
        const data = await Rating.find({ parentsId: id })
        res.send(data)
    },
}