const conn = require('../../config/connect')
const categoryController = require('./category.controller')
const productController = require('./product.controller')

const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')
const cartController = require('./cart.controller')
const { resolveInclude } = require('ejs')


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

    // get info customer
    getInfoUser(req, res){
        const user_token = req.params.user_token
        if(user_token){
            const idUser = jwt.verify(user_token, process.env.KEY_TOKEN)
            const q = `select * from user where idUser = ${idUser} and role = "customer"`
            conn.query(q, (err, results)=>{
                if(results.length > 0){
                    res.json({"customer": results})
                }else{
                    res.redirect('/login')
                }
            })
        }else{
            res.redirect('/login')
        }
    }

    // update info customer 
    updateUser(req, res){
            
        const user_token = req.params.user_token
        if(user_token){
            const idUser = jwt.verify(user_token, process.env.KEY_TOKEN)
            const Name = req.body.Name
            const Birthday = req.body.Birthday
            const Gender = req.body.Gender
            const Address = req.body.Address
            const Phone = req.body.Phone
            const Email = req.body.Email
        
            const q = `update user 
            set Name = "${Name}", 
            Birthday = "${Birthday}",
            Gender = "${Gender}",
            Address = "${Address}",
            Phone = "${Phone}",
            Email = "${Email}"
            where idUser = ${idUser} and role = "customer"`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Updated !"})
                }else{
                    console.log(err)
                    res.json({"message": "Cant update... !"})
                }
            }) 
        }else{
            res.redirect('/login')
        }
    }

    // 

}

module.exports = new homeController()