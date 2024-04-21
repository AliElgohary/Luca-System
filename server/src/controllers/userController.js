const errorHandler = require('../utils/errorHandler')
const userService = require('../services/userService')
// const ErrorResponse = require('../utils/ErrorResponse')
const { validateLoginInput } = require('../validation/login')
const validateCreateUser = require('../validation/createUser')

const login = async (req, res) => {
    // TODO: use base validator class
    const { error, value } = validateLoginInput(req.body)
    if (error) return errorHandler({ ...error, from: 'joi' }, res)

    // no errors
    const { username, password } = value

    const user = await userService.checkUserLogin(username, password)
    if (user.error) return errorHandler(user.error, res)
    // user is logged in successfully

    const accessToken = await userService.generateUserToken(user)

    res.status(200).json({
        success: true,
        accessToken,
    })
}

const createUSer = async (req, res) => {
    const { error, value } = validateCreateUser(req.body)
    if (error) return errorHandler({ ...error, from: 'joi' }, res)

    try {
        const createdUser = await userService.createUser(value)
        res.json(createdUser)
    } catch (ex) {
        errorHandler({ ...ex, resource: 'user' }, res)
    }
}

module.exports = { login, createUSer }
