const conn = require('../../config/connect')
const categoryController = require('./category.controller')
const productController = require('./product.controller')

const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')
const cartController = require('./cart.controller')


class homeController {
    async index(req, res) {
        var categorys = await categoryController.getAllCategory()
        var products = await productController.getProductHome()

        // get cart:
        
        res.render('layouts/main', { 
            "page": "home", 
            "title": "home",
            "categorys": categorys,
            "products": products,
            "cart" : []
        })
    }

}

module.exports = new homeController()