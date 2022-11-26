const conn = require('../../config/connect')
const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')


class cartController {

    // render cart page:
    async index(req, res) {
        var user_token = req.cookies.user_token
        const idCustomer = jwt.verify(user_token, process.env.KEY_TOKEN)

        var cart = await new Promise((resolve, reject)=>{
            const q = `SELECT * FROM cart join product on cart.idProduct = product.idProduct where idCustomer = ${idCustomer};`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error(`Can't get product ! [/cartController/getProduct_idUser]`))
                }
            })
        })

        res.render('layouts/main', { 
            "page": "cart",
            "title": "cart",
            "cart": cart, 
        })
    }

    // get cart:
    getCart(req, res){
        var user_token = req.params.idCustomer
        try{
            const idCustomer = jwt.verify(user_token, process.env.KEY_TOKEN)
            const q = `SELECT * FROM cart join product on cart.idProduct = product.idProduct where idCustomer = ${idCustomer};`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"cart": results})
                }else{
                    res.json({"Error: ": new Error(`Can't get product ! [/cartController/getProduct_idUser]`)})
                }
            })
        }
        catch(error){
            res.json({"Error": error})
        }
    }

    // check product in db
    checkProduct(req, res, next){
        var id = req.body.idCustomer
        const idCustomer = jwt.verify(id, process.env.KEY_TOKEN)
        
        var idProduct = Number(req.body.idProduct)
        var number = Number(req.body.number)

        const q_checkProduct = `SELECT * FROM cart where idProduct = ${idProduct} and idCustomer = ${idCustomer}`
        conn.query(q_checkProduct, (err, results)=>{
            if(results.length > 0){
                const q_updateProduct = `update cart set countBuy = countBuy + ${number} where idProduct = ${idProduct} and idCustomer = ${idCustomer}`
                conn.query(q_updateProduct, (err, results)=>{
                    if(err){
                        console.log(err)
                        return
                    }
                })
            }else{
                next()
            }
        })
    }

    // add product on cart
    addProduct(req, res){
        var id = req.body.idCustomer
        var idProduct = Number(req.body.idProduct)
        var number = Number(req.body.number)

        const idCustomer = jwt.verify(id, process.env.KEY_TOKEN)
        const q = `insert into	cart values(${idProduct}, ${idCustomer}, ${number})`
        conn.query(q, (err, results)=>{
            if(err){
                res.json({"Error: ": new Error(`Can't get product ! [/cartController/getProduct_idUser]`)})
            }
        })
    }

    // delete product in cart 
    deleteProduct(req, res){
        var id = req.body.idCustomer
        var idProduct = Number(req.body.idProduct)
        const idCustomer = jwt.verify(id, process.env.KEY_TOKEN)
        const q = `delete from	cart where idProduct = ${idProduct} and idCustomer = ${idCustomer}`
        conn.query(q, (err, results)=>{
            if(err){
                res.json({"Error: ": new Error(`Can't get product ! [/cartController/deleteProduct]`)})
            }
        })
    }

    // update cart 
    updateCart(req, res){
        var id = req.body.idCustomer
        var idProduct = req.body.idProduct
        var number = req.body.number
        idProduct = Number(idProduct)
        number = Number(number)
        const idCustomer = jwt.verify(id, process.env.KEY_TOKEN)
        const q = `UPDATE cart	SET countBuy = ${number} WHERE idProduct = ${idProduct} and idCustomer = ${idCustomer}`
        conn.query(q, (err, results)=>{
            if(err){
                res.json({"Error: ": new Error(`Can't update cart ! [/cartController/updateCart]`)})
            }
        })
    }

    //

}

module.exports = new cartController()