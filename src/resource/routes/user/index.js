const express = require('express')
const homeRouter = require('./home')
const cartRouter = require('./cart')
const productRouter = require('./product')
const contactRouter = require('./contact')
const loginRouter = require('../login')
const registerRouter = require('../register')
const categoryRouter = require('./category')


const routeUser = function(app) {
    app.use('/', homeRouter)

    app.use('/cart', cartRouter)

    app.use('/product', productRouter)

    app.use('/contact', contactRouter)

    app.use('/login', loginRouter)

    app.use('/register', registerRouter)

    app.use('/category', categoryRouter)
    // app.use('/search')


    

}

module.exports = routeUser;

