const mongoose = require('mongoose')
const { PRODUCT_SIZES } = require('../constant')

const ReceiptSchema = new mongoose.Schema(
    {
        number: {
            type: String,
            unique: true,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        price: {
            type: Number,
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                size: {
                    type: String,
                    enum: PRODUCT_SIZES,
                },
                itemsNumber: {
                    type: Number,
                    default: 1,
                },
                discount: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true }
)
ReceiptSchema.methods.calculateTotalPrice = () => {
    // const check = this;
}
const receipt = mongoose.model('Receipt', ReceiptSchema)
module.exports = receipt
