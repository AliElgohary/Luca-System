const errorHandler = require('../utils/errorHandler')
const validateCreateCategoryInput = require('../validation/createCategory')
const categoryService = require('../services/categoryService')
const validateReport = require('../validation/report')

const createCategory = async (req, res) => {
    try {
        const { success, error, value } = validateCreateCategoryInput(
            req.body
        ).validate()
        if (!success) throw error
        const newCategory = await categoryService.createCategory(value, res)
        res.status(201).json(newCategory)
    } catch (err) {
        errorHandler({ ...err, resource: 'category' }, res)
    }
}

const categories = async (req, res) => {
    const categories = await categoryService.getAllCategories()
    res.json(categories)
}

const category = async (req, res) => {
    const catId = req.params.id
    const category = await categoryService.getCategory(catId)
    if (!category) return res.status(404).json({ msg: 'category not found' })
    res.json(category)
}

const deleteCategory = async (req, res) => {
    try {
        const catId = req.params.id
        const deletedCategory = await categoryService.deleteCategory(catId)

        if (!deletedCategory)
            return res.status(404).json({ msg: 'category not found' })

        res.json(deletedCategory)
    } catch (err) {
        errorHandler(err, res)
    }
}
const getCategoryReport = async (req, res) => {
    const { error, value } = validateReport(req.params).validate()
    if (error) return errorHandler({ ...error, from: 'joi' }, res)
    const report = await categoryService.categoryReport({
        monthsBefore: value.months,
    })
    res.json(report)
}

const updateCategory = async (req, res) => {
    const { success, error, value } = validateCreateCategoryInput(
        req.body
    ).validate()
    if (!success) return errorHandler(error, res)

    const c = await categoryService.updateCategory(req.params.id, value)
    res.json(c)
}
module.exports = {
    createCategory,
    categories,
    category,
    deleteCategory,
    getCategoryReport,
    updateCategory,
}
