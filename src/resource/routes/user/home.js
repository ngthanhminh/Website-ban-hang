const express = require('express')

const homeController = require('../../../app/controller/web/home.controller')
const loginController = require('../../../app/controller/web/login')

const router = express.Router()

    // get information for the home page
router.get('/', homeController.index)

    .get('/home', homeController.index)

    // get info customer
    .get('/user/:user_token', loginController.auth_account_remember, homeController.getInfoUser)

    // update customer
    .put('/user/:user_token', homeController.updateUser)

module.exports = router;