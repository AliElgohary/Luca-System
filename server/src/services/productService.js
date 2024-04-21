const Product = require('../models/Product')
const isValidObjectId = require('../utils/isValidObjectId')
const _ = require('lodash')
const moment = require('moment')

const createProduct = async createProductInput => {
    const createdProduct = await Product.create(createProductInput)
    return createdProduct
}

const getAllProducts = async () => {
    const products = await Product.find().sort('name').populate('category')
    return products
}

const getProduct = async id => {
    if (!isValidObjectId(id)) return null
    const product = await Product.findById(id)
    if (!product) return null
    return product
}

const deleteProduct = async id => {
    if (!isValidObjectId(id)) return null
    const deleteProduct = await Product.findByIdAndRemove(id)
    if (!deleteProduct) return null
    return deleteProduct
}
const productReport = async options => {
    const finalMonths = options.monthsBefore || 5

    const untilDate = moment().subtract(finalMonths, 'months')
    const products = await Product.find({
        createdAt: { $gte: untilDate },
    })

    const report = {}
    await Promise.all(
        _.range(finalMonths).map(async num => {
            const monthsAgo = finalMonths - num - 1
            const dueDate = moment().subtract(monthsAgo, 'months')

            report[dueDate.format('MMM')] = []
            const monthReport = products.filter(c => {
                return moment(c.createdAt).isSameOrBefore(dueDate)
            })
            report[dueDate.format('MMM')].push(...monthReport)
        })
    )

    return report
}

const updateProduct = async (id, data) => {
    const product = await Product.findOneAndUpdate({ _id: id }, data)
    return product
}
module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    productReport,
    updateProduct,
}
