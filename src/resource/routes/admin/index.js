const express = require('express')
const adminRouter = require('./admin')
const categoryRouter = require('./category')
const productRouter = require('./product')
const cartRouter = require('./cart')


const routeAdmin = function(app) {
    app.use('/admin', adminRouter)

    app.use('/admin/category', categoryRouter)

    app.use('/admin/product', productRouter)

    app.use('/admin/customer', cartRouter)



}

module.exports = routeAdmin;

