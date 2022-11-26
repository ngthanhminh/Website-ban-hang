const express = require('express')
const homeRouter = require('./home')
const cartRouter = require('./cart')
const productRouter = require('./product')
const contactRouter = require('./contact')
const loginRouter = require('../login')

const routeAdmin = function(app) {
    app.use('/', homeRouter)

    app.use('/cart', cartRouter)

    app.use('/product', productRouter)

    app.use('/contact', contactRouter)

    app.use('/', loginRouter)

    

}

module.exports = routeAdmin;

