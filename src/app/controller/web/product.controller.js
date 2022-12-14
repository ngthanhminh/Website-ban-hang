const conn = require('../../config/connect')
const categoryController = require('./category.controller')

const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')
const cartController = require('./cart.controller')
const multer = require('multer')
const path = require('path')
const rootPath = require('app-root-path')
const { resolve } = require('path')


class productController {

    // render shop page
    async index(req, res) {
        // get product for product page:
        const products = await new Promise((resolve, reject)=>{
            const q = `SELECT * FROM product limit 8`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('No data with table product'))
                }
            })
        })
        const categories = await categoryController.getAllCategory()        
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
                    res.json({"message": new Error("Can't get product !")})
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
                    res.json({"message": new Error("Can't get all product !")})
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
                    res.json({"message": new Error("Can't get all product !")})
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
                res.json({"message": new Error("Can't get some product !")})
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
                res.json({"message": new Error("Can't get some product !")})
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
                    res.json({"message": new Error("Can't get some product !")})
                }
            })
        }else{
            res.json({"message": new Error("Can't get some product !")})
        }  
    }

    // get product in customer'cart
    getProductsCart(req, res){
        var id = req.params.idCustomer
        // console.log(id)
        if(id){
            const q = `SELECT * FROM product join cart
                        on product.idProduct = cart.idProduct
                        where idUser = ${id}`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"products": results})
                }else{
                    res.json({"message": new Error("Can't get some product !")})
                }
            })
        }else{
            res.json({"message": new Error("Can't get some product !")})
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
                    res.json({"message": new Error("Can't get some product !")})
                }
            })
        }else{
            res.json({"message": new Error("Can't get some product !")})
        }  
    }

    // check product 
    checkProduct(req, res, next){
        var idProduct = req.params.idProduct
        var idProduct = Number(idProduct)
        if(idProduct){
            const q = `select * FROM product where idProduct = ${idProduct}`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        next()
                    }else{
                        res.json({"message": "Product is not exist !"})
                    }
                }
            )
        }else{
            res.json({"message": "Product not exist !"})
        }
    }

    // check add product 
    checkAddProduct(req, res, next){
        var idProduct = req.body.idProduct
        var idProduct = Number(idProduct)
        if(idProduct){
            const q = `select * FROM product where idProduct = ${idProduct}`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        res.send(`
                        <div style="margin: 40px; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
                            <h3>Product already exist !</h3>
                            <button style="padding: 4px 14px" onclick="back()"><a href='/admin' style="text-decoration:none;">Home</a></button>
                        </div>`)
                    }else{
                        next()
                    }
                }
            )
        }else{
            res.json({"message": "Product is not exist !"})
        }
    }

    // add product 
    async addProduct(req, res){
        const idProduct = req.body.idProduct
        const productName = req.body.productName
        const productCount = req.body.productCount
        const productPrice = req.body.productPrice
        const productInfo = req.body.productInfo
        const productImage = req.file.filename
        const idCategory = req.body.idCategory

        if(req.file.filename){
            const q1 = `select * from category where idCategory = ${idCategory}`
                conn.query(q1, (err, results)=>{
                    if(results.length > 0){
                        const q = `insert into product values(${idProduct}, "${productName}", "${productInfo}", "${productImage}", ${productCount}, ${productPrice}, ${idCategory} )`
                        conn.query(q, (err, results)=>{
                            if(!err){
                                res.send(`
                                        <div style="margin: 40px; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
                                            <h3>Added product !</h3>
                                            <button style="padding: 4px 14px"><a href='/admin' style="text-decoration:none;">Home</a></button>
                                        </div>`)
                            }else{
                                console.log(err)
                                res.json({"message": "Cant update product !"})
                            }}
                        )
                    }else{
                        res.json({"message": "Id category not exist !"})
                    }
                })
        }
    }

    // update product 
    updateProduct(req, res){
        const idProduct = req.params.idProduct
        const productName = req.body.productName
        const productCount = req.body.productCount
        const productPrice = req.body.productPrice
        const productInfo = req.body.productInfo
        const idCategory = req.body.idCategory

        if(req.file){
            var productImage = req.file.filename
            const q = `update product 
                    set productName = "${productName}", 
                    productPrice = "${productPrice}",
                    productCount = "${productCount}",
                    productImage = "${productImage}",
                    idCategory = ${idCategory}
                    where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.send(`
                            <div style="margin: 40px; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
                                <h3>Product has been updated !</h3>
                                <button style="padding: 4px 14px"><a href='/admin' style="text-decoration:none;">Home</a></button>
                            </div>`)
                }else{
                    res.json({"message": "Cant update product !"})
                }
            })
        }else{
            const q = `update product 
                        set productName = "${productName}", 
                        productPrice = "${productPrice}",
                        productCount = "${productCount}",
                        idCategory = ${idCategory}
                        where idProduct = ${idProduct}`
                conn.query(q, (err, results)=>{
                    if(!err){
                        res.send(`
                            <div style="margin: 40px; display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
                                <h3>Product has been updated !</h3>
                                <button style="padding: 8px 40px"><a href='/admin' style="text-decoration:none;">Home</a></button>
                            </div>
                        `)
                    }else{
                        res.json({"message": "Cant update product !"})
                    }
                })
        }
    }

    // delete product
    deleteProduct(req, res){
        var idProduct = req.params.idProduct
        var idProduct = Number(idProduct)
        const q = `delete FROM product where idProduct = ${idProduct}`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"product": results})
                }else{
                    res.json({"Error": new Error("Can't get product !")})
                }
            })
    }

    // delete product cart
    deleteProductCart(req, res){
        var idProduct = req.params.idProduct
        var idUser = req.params.idCustomer
        const q = `delete FROM cart where idProduct = ${idProduct} and idUser = ${idUser}`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Deleted product in cart !"})
                }else{
                    res.json({"Error": new Error("Can't get product !")})
                }
            })
    }

    // get product search 
    search(req, res){
        var productName = req.params.productName
        const q = `select * FROM product where productName like("%${productName}%") `
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"products": results})
            }else{
                res.json({"message" : 'Cant not find... !'})
            }
        })
    }

    // check add product to cart
    checkAddProductCart(req, res, next){
        var idUser = req.params.idCustomer
        var idProduct = req.body.idProduct
        var countBuy = req.body.countBuy
        const q = `select * from cart where idUser = ${idUser} and idProduct = ${idProduct}`
        conn.query(q, (err, results)=>{
            if(results.length > 0){
                res.json({"message": "Product already in the cart !"})
            }else{
                next()
            }
        })
    }

    // check add product to cart
    checkProductExist(req, res, next){
        var idUser = req.params.idCustomer
        var idProduct = req.body.idProduct
        var countBuy = req.body.countBuy
        const q = `select * from product where idProduct = ${idProduct}`
        conn.query(q, (err, results)=>{
            if(results.length > 0){
                next()
            }else{
                res.json({"message": "Product is not exist !"})
            }
        })
    }

    // add Product to Cart
    addProductCart(req, res){
        var idUser = req.params.idCustomer
        var idProduct = req.body.idProduct
        var countBuy = req.body.countBuy
        const q = `insert into cart values(${idProduct}, ${idUser}, ${countBuy})`
        conn.query(q, (err, results)=>{
            if(!err){
                res.json({"message": "Added product to cart !"})
            }else{
                console.log(err)
                res.json({"message" : 'Cannot add product to cart... !'})
            }
        })
    }
    
    // update product in cart
    updateProductCart(req, res){
        var idUser = req.params.idCustomer
        var idProduct = req.params.idProduct
        var countBuy = req.body.countBuy
        console.log(countBuy)
        const q = `update cart set countBuy = ${countBuy} where idUser = ${idUser} and idProduct = ${idProduct}`
        conn.query(q, (err, results)=>{
            if(!err){
                res.json({"message": "Updated product in cart !"})
            }else{
                console.log(err)
                res.json({"message" : 'Cannot update product in cart... !'})
            }
        })
    }

    //

}

module.exports = new productController()