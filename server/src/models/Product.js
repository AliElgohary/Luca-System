const mongoose = require('mongoose')
const { PRODUCT_SIZES } = require('../constant')

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sizes: [
            {
                stock: {
                    type: Number,
                    default: 0,
                    validate(value) {
                        if (value < 0) {
                            throw new Error("stock can't be less than 0")
                        }
                    },
                },
                label: {
                    type: String,
                    required: true,
                    enum: PRODUCT_SIZES,
                },
            },
        ],
        description: {
            type: String,
            required: false,
        },
        discount: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0 || value > 100) {
                    throw new Error(
                        "disscount can't be less than 0 or greater than 100"
                    )
                }
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
