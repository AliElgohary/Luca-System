const Joi = require("joi")
const BaseValidator = require("./BaseValidator")

const schema = Joi.object({
    label: Joi.string().required(),
    icon: Joi.string(),
  })
  

const validateCreateCategoryInput = (input) => new BaseValidator(schema, input)


module.exports = validateCreateCategoryInput