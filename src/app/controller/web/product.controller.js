const conn = require('../../config/connect')
const categoryController = require('./category.controller')

const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')
const cartController = require('./cart.controller')

class productController {

    // render home page
    async index(req, res) {
        // get product for product page:
        var products = await new Promise((resolve, reject)=>{
            const q = `SELECT * FROM website_shopping.product limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('no data with table product'))
                }
            })
        })

        var categories = await categoryController.getAllCategory()
        
        res.render('layouts/main', { 
            "page": "product", 
            "title": "product",
            "products": products,
            "categories": categories,
            "cart": [],
        })
    }

    // get product with idProduct
    getProduct(req, res){
        var id = req.params.idProduct
        var id = Number(id)
        const q = `SELECT * FROM website_shopping.product where idProduct = ${id}`
            conn.query(q, (err, results)=>{
                // console.log(results)
                if(results){
                    return res.json({"product": results})
                }else{
                    res.json({"Error": new Error("Can't get product !")})
                }
            })
    }
    
    // get all product (get 8 product)
    getAllProduct(req, res) {
            const q = `SELECT * FROM website_shopping.product limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    return res.json({"products": results})
                }else{
                    res.json({"Error": new Error("Can't get all product !")})
                }
            })
        }

    // get product for home page
    getProductHome() {
        return new Promise((resolve, reject)=>{
            const q = `SELECT * FROM website_shopping.product limit 4`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('no data with table product'))
                }
            })
        })
    }
    
    // load product for category: 'all product'
    loadSomeProduct(req, res){
        var page = req.params.page
        var page_size = 4
        if(page){
            page = parseInt(page)
        }
        if(page < 0){
            page = 1
        }
        var start = (page - 1)*page_size
        const q = `SELECT * FROM website_shopping.product limit ${start}, ${page_size}`
        conn.query(q, (err, results)=>{
            if(results){
                return res.json({"products": results})
            }else{
                throw new Error("Can't get some product !")
            }
        })
    }

    // load product for category: 
    loadSomeProductCP(req, res){
        var page = req.params.pageCP
        var id = req.params.idCategory
        var id = Number(id)
        var page_size = 4
        if(page){
            page = parseInt(page)
        }
        if(page < 0){
            page = 1
        }
        var start = (page - 1)*page_size
        const q = `SELECT * FROM website_shopping.product where idCategory = ${id} limit ${start}, ${page_size}`
        conn.query(q, (err, results)=>{
            if(results){
                return res.json({"products": results})
            }else{
                throw new Error("Can't get some product !")
            }
        })
    }

    // get product in a category:
    getProductCategory(req, res){
        var id = req.params.idCategory
        var id = Number(id)
        // console.log(id)
        if(id){
            const q = `SELECT * FROM product where idCategory = ${id} limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    // console.log(results)
                    return res.json({"products": results})
                }else{
                    throw new Error("can't get some product !")
                }
            })
        }else{
            console.log('')
        }  
    }

    // search product:
    getProductSearch(req, res){
        var productName = req.params.productName
        productName = productName.trim()
        // console.log(id)
        if(productName){
            const q = `SELECT * FROM product where productName like '%${productName} %'`
            conn.query(q, (err, results)=>{
                if(results){
                    // console.log(results)
                    return res.json({"products": results})
                }else{
                    throw new Error("can't get some product !")
                }
            })
        }else{
            console.log('')
        }  
    }
    
}

module.exports = new productController()