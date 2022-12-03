const express = require('express')
const multer = require('multer')
const rootPath = require('app-root-path')
const path = require('path')
const upload = require(rootPath + '/src/app/controller/admin/upload')

const productController = require('../../../app/controller/web/product.controller')
const adminController = require('../../../app/controller/admin/admin.controller')

const router = express.Router()

 
router.get('/', adminController.auth_account_Admin, productController.getAllProducts)

    // get a product 
    .get('/:idProduct', productController.getProduct)

    // search product
    .get('/search/:productName', productController.search)

    // get products in cart customer
    .get('/customer/:idCustomer', productController.getProductsCart )

    // add product
    .post('/', [upload.single('productImage'), productController.checkAddProduct], productController.addProduct)

    // update product
    .post('/:idProduct', upload.single('productImage'), productController.updateProduct)

    // add product to cart
    .post('/customer/:idCustomer', [productController.checkAddProductCart, productController.checkProductExist], productController.addProductCart) 
     
    // update product in cart
    .put('/:idProduct/customer/:idCustomer', productController.updateProductCart)

    // delete product
    .delete('/:idProduct', productController.checkProduct, productController.deleteProduct)

    // delete product in cart
    .delete('/:idProduct/customer/:idCustomer', productController.deleteProductCart)


module.exports = router;