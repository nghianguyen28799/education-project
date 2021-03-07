const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const Schema = mongoose.Schema;

var teacherSchema = new Schema({
    userName: {
        type: String,
        required: true,
        // min: 6,
        // max: 30
    },

    password: {
        type: String,
        required: true,
        // min: 6,
        // max: 255,
    },

    FullName: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    NumberPhone: {
        type: String,
        required: true,
    },

    Gender: {
        type: String,
        requied: true
    },
    
    Avatar: {
        type: String,
        required: false,
    },

    BirthDay: {
        type: String,
        required: true,
    },

    Identification: {
        type: String,
        required: true
    },

    HomeTown: {
        type: String,
        required: true
    },
    
    Worked: {
        type: Number,
        required: true,
    },

    ClassCode: {
        type: String,
        required: false,
    },

    permission: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            require: true
        },
        tokenDevices: {
            type: String
        }
    }]
})

teacherSchema.pre('save', async function(next) {
    console.log('save');
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

teacherSchema.methods.changeInfo = async function(teacher) {
    if(teacher.password) {
        this.userName = teacher.userName 
        this.password = teacher.password
        this.myFullName = teacher.myFullName
        this.Email = teacher.Email
        this.NumberPhone = teacher.NumberPhone,
        this.Gender = teacher.Gender
        this.BirthDay = teacher.BirthDay
        this.Identification = teacher.Identification
        this.HomeTown = teacher.HomeTown
        this.Worked = teacher.Worked
        this.permission = teacher.permission
        this.ClassCode = teacher.ClassCode
        await this.save()
    } else {
        this.userName = teacher.userName 
        this.myFullName = teacher.myFullName
        this.Email = teacher.Email
        this.NumberPhone = teacher.NumberPhone,
        this.Gender = teacher.Gender
        this.BirthDay = teacher.BirthDay
        this.Identification = teacher.Identification
        this.HomeTown = teacher.HomeTown
        this.Worked = teacher.Worked
        this.ClassCode = teacher.ClassCode
        await this.save()
    }
}

teacherSchema.methods.generateAuthToken = async function(tokenDevices) {
    const token = jwt.sign({ _id: this._id }, JWT_KEY)
    this.tokens = this.tokens.concat({token, tokenDevices})
    await this.save()
    return token
}

teacherSchema.methods.removeAuthToken = async function(getToken) {
    this.tokens = this.tokens.filter(token => {
        return token.token !== getToken  
    });
    await this.save();
    return getToken
}

teacherSchema.statics.findByCredentials = async function(userName, password) {
    const user = await Teacher.findOne({ userName })

    console.log(user);

    if(!user) {
        throw new Error({ error: 'Invalid login credentials'})
    }

    const isPasswordCheck = await bcrypt.compare(password, user.password)

    if(!isPasswordCheck) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher


