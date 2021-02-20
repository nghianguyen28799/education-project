const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if(!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email'});
            }
        }
    },

    myFullName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    
    numberPhone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    student: {
        type: String,
        required: false,
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
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)

    }
    next()
})

userSchema.statics.password = async function(password) {
    const passwd = await bcrypt.hash(password, 8)
    return passwd
}

userSchema.methods.generateAuthToken = async function(tokenDevices) {
    const token = jwt.sign({ _id: this._id }, JWT_KEY)
    this.tokens = this.tokens.concat({token, tokenDevices})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async function(userName, password) {
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

var User = mongoose.model('User', userSchema, 'users');

module.exports = User