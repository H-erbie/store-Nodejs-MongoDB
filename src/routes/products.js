const express = require('express')
const { getAllProductsstatic, getAllProducts } = require('../controllers/products')
const router = express.Router()

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsstatic)

module.exports = router