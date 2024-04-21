const { Router } = require('express')
const router = Router()
const customerController = require('../controllers/customerController')

router.post('/', customerController.createCustomer)
router.get('/report/:months', customerController.getCustomerReport)
router.get('/', customerController.customers)
router.get('/:id', customerController.customer)
router.delete('/:id', customerController.deleteCustomer)
router.put('/:id', customerController.updateCustomer)

module.exports = router
