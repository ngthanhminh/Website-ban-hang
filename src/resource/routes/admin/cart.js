const express = require('express')

// const siteController = require('../../app/controller/siteController')
const productController = require('../../../app/controller/web/product.controller')
// const gioHangController = require('../../app/controller/gioHangController')

const router = express.Router()

router.use((req, res, next) => {
    next()
})
    .get('/', productController.index)



module.exports = router;