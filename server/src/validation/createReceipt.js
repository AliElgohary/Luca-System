const Joi = require('joi')
const BaseValidator = require('./BaseValidator')
const { PRODUCT_SIZES } = require('../constant')

const schema = Joi.object({
    customer: Joi.string().required(),
    price: Joi.number().required(),
    products: Joi.array()
        .required()
        .min(1)
        .items({
            product: Joi.string().required(),
            size: Joi.string()
                .required()
                .valid(...PRODUCT_SIZES)
                .label('size label'),
            discount: Joi.number().max(100).default(0),
            itemsNumber: Joi.number().default(1),
        }),
})

const validateCreateReceiptInput = input => new BaseValidator(schema, input)
module.exports = validateCreateReceiptInput

/**
 *
 * orders : status => pending , on the way , recieved , declined   ( feature )
 *
 * crud category front - crud product , crud customers , crud receipts
 *
 *
 *
 *
 */
