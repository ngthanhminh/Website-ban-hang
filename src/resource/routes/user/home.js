const express = require('express')

const homeController = require('../../../app/controller/web/home.controller')


const router = express.Router()

    // get information for the home page
router.get('/', homeController.index)   
    .get('/home', homeController.index)


module.exports = router;