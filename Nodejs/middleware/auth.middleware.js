const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const Teacher = require('../models/teacher.model')

const auth = async(req, res, next) => {
    const token = req.body.token; // doi thanh header
    const permission = req.body.permission;
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        if(permission === 'teacher' || permission === 'supervisor') {
            const user = await Teacher.findOne({ _id: data._id })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } else {
            const user = await User.findOne({ _id: data._id })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        }
        
       
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth