const { Router } = require('express')
const categoryController = require('../controllers/categoryController')

const router = Router()

router.post('/', categoryController.createCategory)
router.get('/report/:months', categoryController.getCategoryReport)
router.get('/', categoryController.categories)
router.get('/:id', categoryController.category)
router.delete('/:id', categoryController.deleteCategory)
router.put('/:id', categoryController.updateCategory)
module.exports = router
