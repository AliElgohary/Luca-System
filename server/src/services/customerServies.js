const Customer = require('../models/Customer')
const isValidObjectId = require('../utils/isValidObjectId')
const _ = require('lodash')
const moment = require('moment')

const createCustomer = async input => {
    const createCustomer = await Customer.create(input)
    return createCustomer
}

const getAllCustomers = async () => {
    const customers = await Customer.find().sort('name')
    return customers
}

const getCustomer = async id => {
    if (!isValidObjectId(id)) return null
    const customer = await Customer.findById(id)
    if (!customer) return null
    return customer
}

const deleteCustomer = async id => {
    if (!isValidObjectId(id)) return null
    const deleteCustomer = await Customer.findByIdAndRemove(id)
    if (!deleteCustomer) return null
    return deleteCustomer
}

const customerReport = async options => {
    const finalMonths = options.monthsBefore || 5

    const untilDate = moment().subtract(finalMonths, 'months')
    const customers = await Customer.find({
        createdAt: { $gte: untilDate },
    })

    const report = {}
    await Promise.all(
        _.range(finalMonths).map(async num => {
            const monthsAgo = finalMonths - num - 1
            const dueDate = moment().subtract(monthsAgo, 'months')

            report[dueDate.format('MMM')] = []
            const monthReport = customers.filter(c => {
                return moment(c.createdAt).isSameOrBefore(dueDate)
            })
            report[dueDate.format('MMM')].push(...monthReport)
        })
    )

    return report
}

const updateCustomer = async (id, data) => {
    const customer = await Customer.findOneAndUpdate({ _id: id }, data)
    return customer
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomer,
    deleteCustomer,
    customerReport,
    updateCustomer,
}
