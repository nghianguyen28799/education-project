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
                gender: req.body.gender,
                relationship: req.body.relationship,
                birthDay: req.body.birthDay,
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
                    gender: req.body.gender,
                    relationship: req.body.relationship,
                    birthDay: req.body.birthDay,
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
                    gender: req.body.gender,
                    relationship: req.body.relationship,
                    birthDay: req.body.birthDay,
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

            const { tokenDevices } = req.body;
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
            userName: req.user.userName,
            Email: req.user.email,
            FullName: req.user.myFullName,
            Avatar: req.user.avatar,
            NumberPhone: req.user.numberPhone,
            Address: req.user.address,
            permission: 'parents',
            gender: req.user.gender,
            relationship: req.user.relationship,
            birthDay: req.user.birthDay,
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

    getUserFromClass: async(req, res) => {
        const isClass = req.body.ClassCode;
        await User.find({ ClassCode: isClass })
        .then(data => {
            res.json(data);
        })
    },

    getUserById: async(req, res) => {
        const id = req.body.id;
        await User.find({ _id: id })
        .then(data => {
            res.json(data);
        })
    },

    changeInfoParents: async(req, res) => {
        const user = req.body.parentsData;

        const condition = {
            _id: user._id
        }

        const handler = {
            myFullName: user.FullName,
            numberPhone: user.NumberPhone,
            email: user.Email,
            birthDay: user.birthDay,
            relationship: user.relationship,
            address: user.Address,
            gender: user.gender,
        }
        // console.log(handler);
      
        await User.updateOne(condition, handler)
        .then(() => {
            res.send({data: 'Updated success'})
        }).catch(error => {
            res.send({error: error})
        })
    },

    changeAvatarParents: async(req, res) => {
        const { path } = req.file;
        const id = req.body._id;
        const condition = { _id: id }
        const handler = {
            avatar: path
        }
        await User.updateOne(condition, handler)
        .then(() => {
            res.send({uri: path})
        }).catch(error => {
            res.send({error: error})
        })
    },

    changePasswordParents: async(req, res) => {
        try {
            const { userName, password, newPassword1, newPassword2 } = req.body;

            const user = await User.findByCredentials(userName, password)
            if(!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            
            if(newPassword1.length < 7 ) {
                return res.json({ errorValid: true })
            }
            
            if(newPassword1 !== newPassword2) {
                return res.json({ errorExist: true })
            }
            
            await user.changePassword(newPassword1)

            return res.json({ success: true })
        } catch (error) {
            res.send({error: true})
        }
    },
}