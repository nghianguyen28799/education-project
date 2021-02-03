const User = require("../models/users.model");
// const auth = require("../middleware/auth.middleware")
module.exports = {
    register: async(req, res) => {
        console.log("register");
        try { 
            const user = new User ({
                userName : "nghianguyen",
                password : "a123456",
                email : "nghianguyen28799@gmail.com",
                myFullName : "NT Nghia",
                numberPhone : "0898211019",
                address : "asbi asdiuas bduisabiu dbsaiubd",
                StudentFullName : "Phuc hoc gioi",
                schoolCode : "School01",
                classCode : "17V7A1",
                decentralization : 0,
            })
            // console.log(user);
            await user.save();
            const token = await user.generateAuthToken()
            res.status(201).send({user, token})
        } catch (error) {
            res.status(400).send(error)
        }
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
    
    test: (req, res) => {
        res.send("HELLO WORLD")
    }
}