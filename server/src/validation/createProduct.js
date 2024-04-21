const Joi = require("joi")
const { PRODUCT_SIZES } = require("../constant")
const BaseValidator = require("./BaseValidator")

const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    sizes: Joi.array().items({
         label : Joi.string().required().valid(...PRODUCT_SIZES).label("size label"),
         stock: Joi.number().default(0)
    }),
    description: Joi.string(),
    category: Joi.string().required()
 })
 

const validateCreateProductInput = (input) => new BaseValidator(schema, input)
module.exports = validateCreateProductInput