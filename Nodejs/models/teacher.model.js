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

    Name: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Sex: {
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

    token: [{
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

teacherSchema.statics.password = async function(password) {
    const passwd = await bcrypt.hash(password, 8)
    return passwd
}

teacherSchema.methods.generateAuthToken = async function(tokenDevices) {
    const token = jwt.sign({ _id: this._id }, JWT_KEY)
    this.tokens = this.tokens.concat({token, tokenDevices})
    await this.save()
    return token
}

teacherSchema.statics.findByCredentials = async function(userName, password) {
    const user = await User.findOne({ userName })
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


