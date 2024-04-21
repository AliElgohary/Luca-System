const mongoose = require('mongoose')
const { DEFAULT_CATEGORY_ICON } = require('../config/constants')

const CategorySchema = new mongoose.Schema(
    {
        label: {
            type: String,
            unique: true,
            required: true,
        },
        icon: {
            type: String,
            default: DEFAULT_CATEGORY_ICON,
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
