const Category = require('../models/Category')
const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')
const isValidObjectId = require('../utils/isValidObjectId')
const _ = require('lodash')
const moment = require('moment')

const createCategory = async input => {
    const createdCategory = await Category.create(input)
    return createdCategory
}

const getAllCategories = async () => {
    const categoriesWithProductsCount = await Category.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'category',
                as: 'products',
            },
        },
        {
            $project: {
                _id: 1,
                label: 1,
                icon: 1,
                createdAt: 1,
                updatedAt: 1,
                productsCount: { $size: '$products' },
            },
        },
    ])

    return categoriesWithProductsCount
}

const getCategory = async id => {
    if (!isValidObjectId(id)) return null
    const category = await Category.findById(id)
    if (!category) return null
    return category
}

const deleteCategory = async id => {
    if (!isValidObjectId(id)) return null

    const products = await Product.find().where('category').equals(id)

    if (products.length > 0)
        throw new ErrorResponse("you can't delete this category", 400)

    const deletedCategory = await Category.findByIdAndRemove(id)
    if (!deletedCategory) return null
    return deletedCategory
}
const categoryReport = async options => {
    const finalMonths = options.monthsBefore || 5

    const untilDate = moment().subtract(finalMonths, 'months')
    const cats = await Category.find({
        createdAt: { $gte: untilDate },
    })

    const report = {}
    await Promise.all(
        _.range(finalMonths).map(async num => {
            const monthsAgo = finalMonths - num - 1
            const dueDate = moment().subtract(monthsAgo, 'months')

            report[dueDate.format('MMM')] = []
            const monthReport = cats.filter(c => {
                return moment(c.createdAt).isSameOrBefore(dueDate)
            })
            report[dueDate.format('MMM')].push(...monthReport)
        })
    )

    return report
}

const updateCategory = async (id, data) => {
    const category = await Category.findOneAndUpdate({ _id: id }, data)
    return category
}
module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    categoryReport,
    updateCategory,
}
