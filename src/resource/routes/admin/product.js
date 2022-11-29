const express = require('express')

// const siteController = require('../../app/controller/siteController')
const productController = require('../../../app/controller/web/product.controller')
// const gioHangController = require('../../app/controller/gioHangController')

const router = express.Router()

router.get('/', productController.getAllProducts)

    // get a product 
    .get('/:idProduct', productController.getProduct)

    // add category
    // .post('/', productController.checkBeforeAdd, categoryController.addCategory)

    // // delete category
    .delete('/:idProduct', productController.checkProduct, productController.deleteProduct)

    // // update category
    .put('/:idProduct', productController.checkProduct, productController.updateProduct)

    // // search category
    // .get('/search/:categoryName', productController.search)



module.exports = router;