const User = require("../models/users.model");
// const auth = require("../middleware/auth.middleware")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
    create: async(req, res) => {
        // console.log("register");
        try { 
            const user = new User ({
                userName : req.body.userName,
                password : req.body.password,
                email : req.body.email,
                myFullName : req.body.myFullName,
                numberPhone : req.body.numberPhone,
                address : req.body.address,
                student : req.body.student,
            })
            // console.log(user);
            await user.save();
            // const token = await user.generateAuthToken()
            // res.status(201).send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    },

    edit: async(req, res) => {
        try {
            const condition = {
                _id: req.body.id
            }
    
            if(req.body.password) {
                const passwowd = User.password(req.body.password);
                var action = {
                    userName : req.body.userName,
                    password : passwowd,
                    email : req.body.email,
                    myFullName : req.body.myFullName,
                    numberPhone : req.body.numberPhone,
                    address : req.body.address,
                    student : req.body.student,
                }
            }
            else {
                var action = {
                    userName : req.body.userName,
                    // password : req.body.password,
                    email : req.body.email,
                    myFullName : req.body.myFullName,
                    numberPhone : req.body.numberPhone,
                    address : req.body.address,
                    student : req.body.student,
                }
            }
            
            console.log(action);

            await User.updateOne(condition, action)
            .then(() => {
                res.json({ update: true })
            })
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
        console.log("login");
        try {
            const userName = "nghianguyen";
            const password = "a1234561";
            const user = await User.findByCredentials(userName, password)

            if(!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            console.log("login success!!")
            // const token = await user.generateAuthToken(tokenDivices)

            res.send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
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