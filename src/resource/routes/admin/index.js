const express = require('express')
const adminRouter = require('./admin')
const cartRouter = require('./cart')
const productRouter = require('./product')
const contactRouter = require('./contact')
const loginRouter = require('../login')

const routeAdmin = function(app) {
    app.use('/admin', adminRouter)

}

module.exports = routeAdmin;

