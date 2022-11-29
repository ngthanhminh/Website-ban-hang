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
            const q = `SELECT * FROM product limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('No data with table product'))
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
        var idProduct = req.params.idProduct
        var idProduct = Number(idProduct)
        const q = `SELECT * FROM product where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                // console.log(results)
                if(results){
                    res.json({"product": results})
                }else{
                    res.json({"Error": new Error("Can't get product !")})
                }
            })
    }
    
    // get 8 product (first load/ get 8 product)
    getAllProduct(req, res) {
            const q = `SELECT * FROM product limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"products": results})
                }else{
                    res.json({"Error": new Error("Can't get all product !")})
                }
            })
        }

    // get all product 
    getAllProducts(req, res){
        const q = `SELECT * FROM product`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"products": results})
                }else{
                    res.json({"Error": new Error("Can't get all product !")})
                }
            })
    }

    // get product for home page (first load home/ get 4 products)
    getProductHome() {
        return new Promise((resolve, reject)=>{
            const q = `SELECT * FROM product limit 4`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('Cant get product'))
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
        const q = `SELECT * FROM product limit ${start}, ${page_size}`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"products": results})
            }else{
                res.json({"Error": new Error("Can't get some product !")})
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
                res.json({"products": results})
            }else{
                res.json({"Error": new Error("Can't get some product !")})
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
                    res.json({"products": results})
                }else{
                    res.json({"Error": new Error("Can't get some product !")})
                }
            })
        }else{
            res.json({"Error": new Error("Can't get some product !")})
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
                    res.json({"products": results})
                }else{
                    res.json({"Error": new Error("Can't get some product !")})
                }
            })
        }else{
            res.json({"Error": new Error("Can't get some product !")})
        }  
    }

    // check product 
    checkProduct(req, res, next){
        var idProduct = req.params.idProduct
        var idProduct = Number(idProduct)
        const q = `select * FROM product where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                if(results.length > 0){
                    next()
                }else{
                    res.json({"Error": "Product not exist !"})
                }
            })
    }

    // update product 
    updateProduct(req, res){
        var idProduct = req.body.idProduct
        var productName = req.body.productName
        var productImage = req.body.productImage
        var productCount = req.body.productCount
        var productPrice = req.body.productPrice
        var productInfo = req.body.productInfo

        const q = `update product 
                    set idProduct = ${idProduct}, 
                    productName = "${productName}", 
                    productPrice = "${productPrice}",
                    productCount = "${productCount}",
                    productImage = "${productImage}",
                    where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Updated product !"})
                }else{
                    res.json({"Error": "Cant update product !"})
                }
            })
    }

    // delete product
    deleteProduct(req, res){
        var idProduct = req.params.idProduct
        var idProduct = Number(idProduct)
        const q = `delete FROM product where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"product": results})
                }else{
                    res.json({"Error": new Error("Can't get product !")})
                }
            })
    }

    
}

module.exports = new productController()