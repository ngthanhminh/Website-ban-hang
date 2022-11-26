const express = require('express')

const homeController = require('../../../app/controller/web/home.controller')


const router = express.Router()

router.use((req, res, next) => {
    next()
})
    .get('/', homeController.index)
    .get('/home', homeController.index)



module.exports = router;