const Joi = require('joi')
const BaseValidator = require('./BaseValidator')

const schema = Joi.object({
    months: Joi.number().positive().max(12).min(1).label('number of months'),
})

const validateReport = input => new BaseValidator(schema, input)

module.exports = validateReport
