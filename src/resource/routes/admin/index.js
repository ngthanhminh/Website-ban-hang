const express = require('express')
const adminRouter = require('./admin')
const categoryRouter = require('./category')
const productRouter = require('./product')
const customerRouter = require('./customer')


const routeAdmin = function(app) {
    app.use('/admin', adminRouter)

    app.use('/admin/category', categoryRouter)

    app.use('/admin/product', productRouter)

    app.use('/admin/customer', customerRouter)



}

module.exports = routeAdmin;

