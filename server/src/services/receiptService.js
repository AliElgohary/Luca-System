const Receipt = require('../models/Receipt')
const isValidObjectId = require('../utils/isValidObjectId')
const uuid = require('uuid')
const createReceipt = async input => {
    input['number'] = uuid.v4()
    const createdReceipt = await Receipt.create(input)
    return createdReceipt
}

const getAllReceipts = async () => {
    const receipts = await Receipt.find()
        .sort({ createdAt: -1 })
        .populate('customer')
        .populate('products.product')
    return receipts
}

const getReceipt = async id => {
    if (!isValidObjectId(id)) return null
    const receipt = await Receipt.findById(id)
    if (!receipt) return null
    return receipt
}

const deleteReceipt = async id => {
    if (!isValidObjectId(id)) return null
    const deleteReceipt = await Receipt.findByIdAndRemove(id)
    if (!deleteReceipt) return null
    return deleteReceipt
}

const updateReceipt = async (id, data) => {
    const receipt = await Receipt.findOneAndUpdate({ _id: id }, data)
    return receipt
}

module.exports = {
    createReceipt,
    getAllReceipts,
    getReceipt,
    deleteReceipt,
    updateReceipt,
}
