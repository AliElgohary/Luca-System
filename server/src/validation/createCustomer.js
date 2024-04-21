const Joi = require('joi')
const BaseValidator = require('./BaseValidator')

const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
})

const validateCreateCustomerInput = input => new BaseValidator(schema, input)

module.exports = validateCreateCustomerInput
