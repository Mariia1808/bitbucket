const Router = require('express')
const router = new Router()

const FlatRouter = require('./flatRouter')
router.use('/flat', FlatRouter)

module.exports = router