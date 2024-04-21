const Joi = require('joi')
const BaseValidator = require('./BaseValidator')
const { loginSchema } = require('./login')

const validateCreateUserSchema = loginSchema.keys({
    email: Joi.string().email().required(),
})

const validateCreateUser = input =>
    new BaseValidator(validateCreateUserSchema, input).validate()

module.exports = validateCreateUser
