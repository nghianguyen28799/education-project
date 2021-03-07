const User = require("../models/users.model");
// const auth = require("../middleware/auth.middleware")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
    create: async(req, res) => {
        try { 
            const user = new User ({
                userName : req.body.userName,
                password : req.body.password,
                email : req.body.email,
                myFullName : req.body.myFullName,
                numberPhone : req.body.numberPhone,
                address : req.body.address,
                student : req.body.student,
                avatar: '',
            })
            await user.save();
        } catch (error) {
            res.status(400).send(error)
        }
    },

    edit: async(req, res) => {
        try {
            if(req.body.password) {
                const user = await User.findOne({ _id: req.body.id })
                const newInfo =  {
                    id: req.body.id,
                    userName : req.body.userName,
                    password : req.body.password,
                    email : req.body.email,
                    myFullName : req.body.myFullName,
                    numberPhone : req.body.numberPhone,
                    address : req.body.address,
                    student : req.body.student,
                }
                await user.changeInfo(newInfo);
            } else {
                const user = await User.findOne({ _id: req.body.id })
                const newInfo =  {
                    id: req.body.id,
                    userName : req.body.userName,
                    // password : password,
                    email : req.body.email,
                    myFullName : req.body.myFullName,
                    numberPhone : req.body.numberPhone,
                    address : req.body.address,
                    student : req.body.student,
                }
                await user.changeInfo(newInfo);
            }
        } catch(error) {
            res.status(400).send(error)
        }
    },

    
    delete: async(req, res) => { 
        const id = req.body.id

        await User.deleteOne({ _id: id })
        .then(() => {
            res.json({ deleted: id })
        })
        .catch(error => {
            console.log(error);
        })
    },


    login: async(req, res) => {
        try {
            const userName = req.body.userName;
            const password = req.body.password;
            const user = await User.findByCredentials(userName, password)
            if(!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            console.log("login success!!")
            const tokenDevices = 'abcdef';
            const token = await user.generateAuthToken(tokenDevices)
        
            res.send({ user, token });
        } catch (error) {
            // res.status(400).send(error);
            res.send({error: true})
        }
    },
    

    logout: async(req, res) => {
        const token = req.token;
        const _id = req.user;
        const user = await User.find({ _id });
        await user[0].removeAuthToken(token);
    },

    getUserFromToken: async(req, res) => {
        const user = {
            _id: req.user._id,
            email: req.user.email,
            myFullName: req.user.myFullName,
            avatar: req.user.avatar,
            numberPhone: req.user.numberPhone,
            address: req.user.address,
            student: req.user.student,
            token: req.token
        }
        // console.log(user);
        res.send(user)
    },

    showUsers: async(req, res) => {
        await User.find()
        .then(data => {
            res.json(data);
        })
    },

    test: (req, res) => {
        res.send("HELLO WORLD")
    }
}