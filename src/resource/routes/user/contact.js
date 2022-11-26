const express = require('express')

const contactController = require('../../../app/controller/web/contact.controller')
const loginController = require('../../../app/controller/web/login')


const router = express.Router()

    //get information for contact page 
    // check login
    router.get('/', loginController.auth_account_remember, contactController.index)
    
    

module.exports = router;