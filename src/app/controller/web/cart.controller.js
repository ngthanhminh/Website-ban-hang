const conn = require('../../config/connect')
const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')


class cartController {

    // render cart page:
    async index(req, res) {
        var user_token = req.cookies.user_token
        const idUser = jwt.verify(user_token, process.env.KEY_TOKEN)

        var cart = await new Promise((resolve, reject)=>{
            const q = `SELECT * FROM cart join product on cart.idProduct = product.idProduct where idUser = ${idUser};`
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
        var idUser = req.params.idUser
        idUser = jwt.verify(idUser, process.env.KEY_TOKEN)
        const q = `SELECT * FROM cart join product on cart.idProduct = product.idProduct where idUser = ${idUser};`
        conn.query(q, (err, results)=>{
            if(results){
                res.status(200).json({"cart": results})
            }else{
                res.status(400).json({"Error: ": new Error(`Can't get product !`)})
            }
        })
        
    }

    // check product in db
    checkProduct(req, res, next){
        var id = req.body.idUser
        var idProduct = Number(req.body.idProduct)
        var number = Number(req.body.number)
        const idUser = jwt.verify(id, process.env.KEY_TOKEN)

        const q_checkProduct = `SELECT * FROM cart where idProduct = ${idProduct} and idUser = ${idUser}`
        conn.query(q_checkProduct, (err, results)=>{
            if(results.length > 0){
                const q_updateProduct = `update cart set countBuy = countBuy + ${number} where idProduct = ${idProduct} and idUser = ${idUser}`
                conn.query(q_updateProduct, (err, results)=>{
                    if(results){
                        res.json({"message": "Updated product !"})
                    }else{
                        res.json({"Error": new Error("Update product false !")})
                    }
                })
            }else{
                next()
            }
        })
    }

    // add product to cart
    addProduct(req, res){
        var id = req.body.idUser
        var idProduct = Number(req.body.idProduct)
        var number = Number(req.body.number)

        const idUser = jwt.verify(id, process.env.KEY_TOKEN)
        const q = `insert into	cart values(${idProduct}, ${idUser}, ${number})`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"message": "added product !"})
            }else{
                res.json({"Error: ": new Error(`Can't get product ! [/cartController/getProduct_idUser]`)})
            }
        })
    }

    // delete product in cart 
    deleteProduct(req, res){
        var id = req.body.idUser
        var idProduct = Number(req.body.idProduct)
        if(id){
            const idUser = jwt.verify(id, process.env.KEY_TOKEN)
            const q = `delete from	cart where idProduct = ${idProduct} and idUser = ${idUser}`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"message": "Deleted product !"})
            }else{
                res.json({"Error: ": new Error(`Can't get product !`)})
            }
        })
        }
        else{
            res.json({"Error": "Can't delete !"})
        }
    }

    // update cart 
    updateCart(req, res){
        var id = req.body.idUser
        var idProduct = req.body.idProduct
        var number = req.body.number
        idProduct = Number(idProduct)
        number = Number(number)
        const idUser = jwt.verify(id, process.env.KEY_TOKEN)
        const q = `UPDATE cart	SET countBuy = ${number} WHERE idProduct = ${idProduct} and idUser = ${idUser}`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"message": "updated cart !"})
            }else{
                res.json({"Error: ": new Error(`Can't update cart !`)})
            }
        })
    }

    //

}

module.exports = new cartController()