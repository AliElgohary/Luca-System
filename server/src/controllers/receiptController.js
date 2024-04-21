const receiptService = require('../services/receiptService')
const errorHandler = require('../utils/errorHandler')
const validateCreateReceiptInput = require('../validation/createReceipt')

const createReceipt = async (req, res) => {
    try {
        const { success, error, value } = validateCreateReceiptInput(
            req.body
        ).validate()
        if (!success) throw error

        const newReceipt = await receiptService.createReceipt(value, res)
        res.status(201).json(newReceipt)
    } catch (err) {
        errorHandler({ ...err, resource: 'receipt' }, res)
    }
}

const receipts = async (req, res) => {
    const receipts = await receiptService.getAllReceipts()
    res.json(receipts)
}

const receipt = async (req, res) => {
    const recId = req.params.id
    const receipt = await receiptService.getReceipt(recId)
    if (!receipt) return res.status(404).json({ msg: 'receipt not found' })
    res.json(receipt)
}

const deleteReceipt = async (req, res) => {
    const recId = req.params.id
    const deleteReceipt = await receiptService.deleteReceipt(recId)
    if (!deleteReceipt)
        return res.status(404).json({ msg: 'receipt is not found' })
    res.json(deleteReceipt)
}

const updateReceipt = async (req, res) => {
    const { success, error, value } = validateCreateReceiptInput(
        req.body
    ).validate()
    if (!success) return errorHandler(error, res)

    const r = await receiptService.updateReceipt(req.params.id, value)
    res.json(r)
}

module.exports = {
    createReceipt,
    receipts,
    receipt,
    deleteReceipt,
    updateReceipt,
}
