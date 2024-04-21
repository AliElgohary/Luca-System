const errorHandler = require('../utils/errorHandler')
const validateCreateProductInput = require('../validation/createProduct')
const productService = require('../services/productService')
const validateReport = require('../validation/report')

const createProduct = async (req, res) => {
    const { success, error, value } = validateCreateProductInput(
        req.body
    ).validate()
    if (!success) return errorHandler(error, res)

    const newProduct = await productService.createProduct(value)
    res.status(201).json(newProduct)
}

const products = async (req, res) => {
    const products = await productService.getAllProducts()
    res.json(products)
}

const product = async (req, res) => {
    const prodId = req.params.id
    const product = await productService.getProduct(prodId)
    if (!product) return res.status(404).json({ msg: 'product not found' })
    res.json(product)
}

const deleteProduct = async (req, res) => {
    const prodId = req.params.id
    const deleteProduct = await productService.deleteProduct(prodId)
    if (!deleteProduct)
        return res.status(404).json({ msg: 'product not found' })
    res.json(deleteProduct)
}
const getProductReport = async (req, res) => {
    const { error, value } = validateReport(req.params).validate()
    if (error) return errorHandler({ ...error, from: 'joi' }, res)
    const report = await productService.productReport({
        monthsBefore: value.months,
    })
    res.json(report)
}

const updateProduct = async (req, res) => {
    const { success, error, value } = validateCreateProductInput(
        req.body
    ).validate()
    if (!success) return errorHandler(error, res)

    const p = await productService.updateProduct(req.params.id, value)
    res.json(p)
}

module.exports = {
    createProduct,
    products,
    product,
    deleteProduct,
    getProductReport,
    updateProduct,
}
