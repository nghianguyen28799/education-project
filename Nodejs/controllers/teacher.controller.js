const Teacher = require("../models/teacher.model");
const { response } = require("../routes/index.route");

module.exports = {
    showInfoTeacher: (req, res) => {
        Teacher.find()
        .then(data => {
            res.send(data);
        })
    },

    createAccountTeacher: async(req, res) => {
        try { 
            const user = new Teacher ({
                // userName: 'abc',
                // password: '123456',
                // Name: 'abc',
                // Email: 'abc@gmail.com',
                // Avatar: '',
                // BirthDay: '29/7/1999',
                // Identification: '12321312',
                // HomeTown: 'Hau Giang',
                // Worked: 2017

                userName: req.body.userName,
                password: req.body.password,
                Name: req.body.name,
                Email: req.body.email,
                Avatar: '',
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked
            })
            await user.save();
            // const token = await user.generateAuthToken()
            // res.status(201).send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    },

    editAccountTeacher: async(req, res) => {
        const condition = {
            _id: req.body.id
        }
        
        const checkPass = req.body.password.indexOf('*');
        console.log(checkPass);
        if(checkPass == -1) {
            const passwowd = Teacher.password(req.body.password);
            const action = {
                userName: req.body.userName,
                password: passwowd,
                Name: req.body.name,
                Email: req.body.email,
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked
            }
            await Teacher.updateOne(condition, action)
            .then(() => {
                res.json({ update: true })
            })
        } else {
            const action = {
                userName: req.body.userName,
                Name: req.body.name,
                Email: req.body.email,
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked
            }
            await Teacher.updateOne(condition, action)
            .then(() => {
                res.json({ update: true })
            })
        }
        
        
    },

    deleteAccountTeacher: async(req, res) => {
        const id = req.body.id
        console.log(id);
        await Teacher.deleteOne({ _id: id })
        .then(() => {
            res.json({ deleted: id })
        })
        .catch(error => {
            console.log(error);
        })
    }
}