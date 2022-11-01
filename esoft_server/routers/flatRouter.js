const Router = require('express')
const FlatController = require('../controllers/flatController')
const router = new Router()


router.get('/', FlatController.getAll)
router.get('/:id', FlatController.getOne)

module.exports = router