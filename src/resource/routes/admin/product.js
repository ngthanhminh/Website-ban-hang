const express = require('express')
const multer = require('multer')
const rootPath = require('app-root-path')
const path = require('path')
const upload = require(rootPath + '/src/app/controller/admin/upload')

// const siteController = require('../../app/controller/siteController')
const productController = require('../../../app/controller/web/product.controller')
// const gioHangController = require('../../app/controller/gioHangController')
const router = express.Router()

 
router.get('/', productController.getAllProducts)

    // get a product 
    .get('/:idProduct', productController.getProduct)

    // add product
    .post('/', [upload.single('productImage'), productController.checkAddProduct], productController.addProduct)

    // delete product
    .delete('/:idProduct', productController.checkProduct, productController.deleteProduct)

    // update product
    .post('/:idProduct', upload.single('productImage'), productController.updateProduct)


    // // search product
    .get('/search/:productName', productController.search)

    


module.exports = router;