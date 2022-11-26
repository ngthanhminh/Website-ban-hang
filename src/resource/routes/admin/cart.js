const express = require('express')

const cartController = require('../../../app/controller/web/cart.controller')

const router = express.Router()

router.use((req, res, next) => {
    next();
})
    .get('/', cartController.index)


module.exports = router;