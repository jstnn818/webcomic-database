const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static login method
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    
    const user = await this.findOne({ username })
    if (!user) {
        throw Error('User does not exist')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// static signup method
userSchema.statics.signup = async function(username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")) {
        throw Error('Invalid username')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
        /*
        - min-length: 8
        - At least, one uppercase + lowercase
        - At least, one number + symbol
        */
    }

    const exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })
    return user
}

module.exports = mongoose.model('User', userSchema)