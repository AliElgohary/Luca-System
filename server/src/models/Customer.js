    const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const customer = mongoose.model('Customer', CustomerSchema)
module.exports = customer
