const express = require('express')
const cartController = require('../../../app/controller/web/cart.controller')
const loginController = require('../../../app/controller/web/login')

const router = express.Router()


    // get information for the cart page
    router.get('/', loginController.auth_account_remember, cartController.index)

    // get cart information of customer 
    .get('/:idCustomer', loginController.auth_account_remember, cartController.getCart)

    // add product to cart
    .post('/', [loginController.auth_account_remember, cartController.checkProduct], cartController.addProduct)

    // delete product from cart
    .delete('/', cartController.deleteProduct)

    // update cart 
    .put('/', cartController.updateCart)



    module.exports = router;