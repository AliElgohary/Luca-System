// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { TOKEN_LIFETIME } = require('../config/constants')
const User = require('../models/user')
const ErrorResponse = require('../utils/ErrorResponse')

const findUserById = async id => {
    const user = await User.findById(id)
    if (!user) return null
    return user
}

const findByUsername = async username => {
    const user = await User.findOne({ username })
    if (!user) return null
    return user
}

const checkUserLogin = async (username, password) => {
    const user = await findByUsername(username)
    if (!user)
        return {
            error: new ErrorResponse('username or password is incorrect', 400),
        }

    // TODO: check for email verification
    // check for password
    // TODO: use bcrypt
    // const match = await bcrypt.compare(password, user.password)
    const match = password === user.password
    if (!match)
        return {
            error: new ErrorResponse('username or password is incorrect', 400),
        }

    return user
}

const generateUserToken = async user => {
    let parsedUser = user
    if (user.toJSON) parsedUser = user.toJSON()

    delete parsedUser.password

    const accessToken = jwt.sign(parsedUser, process.env.TOKEN_KEY, {
        expiresIn: TOKEN_LIFETIME,
    })

    return accessToken
}

const createUser = async data => {
    const createdUser = await User.create(data)
    return createdUser
}
module.exports = {
    findUserById,
    findByUsername,
    checkUserLogin,
    generateUserToken,
    createUser,
}
