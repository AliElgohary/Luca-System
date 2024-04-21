const Joi = require('joi')
// TODO: use base validator
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
})
const validateLoginInput = input => {
    return loginSchema.validate(input)
}

module.exports = { validateLoginInput, loginSchema }
