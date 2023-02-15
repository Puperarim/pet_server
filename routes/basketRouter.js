const Router = require('express')
const basketController = require('../controllers/basketController')

const router = new Router()

router.post('/', basketController.create)
router.get('/', basketController.getAll)
router.delete('/', basketController.delete)

module.exports = router