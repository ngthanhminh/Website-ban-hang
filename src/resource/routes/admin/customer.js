const express = require('express')

// const siteController = require('../../app/controller/siteController')
// const sanPhamController = require('../../app/controller/sanPhamController')
const customerController = require('../../../app/controller/admin/customer.controller')
const router = express.Router()

        // get all customer
router.get('/', customerController.getAllCustomers)

    // get a customer 
    .get('/:idCustomer', customerController.getCustomer)

    // add customer
    .post('/', customerController.checkAddCustomer, customerController.addCustomer)

    // update customer
    .put('/:idCustomer', customerController.checkCustomer, customerController.updateCustomer)

    // delete customer
    .delete('/:idCustomer', customerController.checkCustomer, customerController.deleteCustomerCart, customerController.deleteCustomer)
    
    // search customer
    .get('/search/:customerName', customerController.searchCustomer)

module.exports = router;