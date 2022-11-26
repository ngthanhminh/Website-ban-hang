const express = require('express')

// const siteController = require('../../app/controller/siteController')
const productController = require('../../../app/controller/web/product.controller')
// const gioHangController = require('../../app/controller/gioHangController')

const router = express.Router()

        // get information for the shop page
router.get('/', productController.index)

        // get a product
    .get('/:idProduct', productController.getProduct)

        // get more products to show
    .get('/page/:page', productController.loadSomeProduct)

        // get all product
    .get('/category/all', productController.getAllProduct)

        // get products in category
    .get('/category/:idCategory', productController.getProductCategory)

        // get more products in category to show
    .get('/page/:pageCP/category/:idCategory', productController.loadSomeProductCP)

        // get product with keyword search
    .get('/search/:productName', productController.getProductSearch)
    


module.exports = router;