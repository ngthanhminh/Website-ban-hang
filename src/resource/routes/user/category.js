const express = require('express')

const categoryController = require('../../../app/controller/web/category.controller')


const router = express.Router()

    //get information for contact page 
    // check login
    router.get('/', categoryController.getCategories)
    

module.exports = router;