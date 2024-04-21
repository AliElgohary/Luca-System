const { Router } = require('express')
const productController = require('../controllers/productController')
const router = Router()

router.post('/', productController.createProduct)
router.get('/report/:months', productController.getProductReport)
router.get('/', productController.products)
router.get('/:id', productController.product)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.updateProduct)
module.exports = router
