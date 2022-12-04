const conn = require('../../config/connect')
const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')

class adminController {
    
    index(req, res) {
        res.render('layouts/admin')
    }

    // admin account authentication
    auth_account_Admin(req, res, next){
        const admin_token = req.cookies.admin_token
        if(admin_token){
            const idUser = jwt.verify(admin_token, process.env.KEY_ADMIN)
            if(idUser){
                const q = `SELECT * FROM user WHERE idUser = "${idUser}" and role = "admin"`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        next()
                    }else{
                        res.redirect('/login')
                    }
                })
            }
        }else{
            res.redirect('../login')
        }
    }

    // get infomation admin
    info(req, res){
        const admin_token = req.cookies.admin_token
        if(admin_token){
            const idUser = jwt.verify(admin_token, process.env.KEY_ADMIN)
            const q = `SELECT * FROM user WHERE idUser = "${idUser}" and role = "admin"`
                conn.query(q, (err, results)=>{
                    if(results){
                        res.json({"admin": results})
                    }else{
                        res.json({"message": "Admin is not exist !"})
                    }
                })
        }else{
            res.redirect('/login')
        }
    }

    // update admin 
    updateAdmin(req, res){
        const idUser = req.params.idAdmin
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
            
            where idUser = ${idUser} and role = "admin"`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Updated !"})
                }else{
                    console.log(err)
                    res.json({"message": "Cant update... !"})
                }
            })     
    }

    // check admin 
    checkAdmin(req, res, next){
        var idUser = req.params.idAdmin
        if(idUser){
            const q = `select * FROM user where idUser = ${idUser} and role = "admin"`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        next()
                    }else{
                        res.json({"message": "Admin not exist !"})
                    }
                }
            )
        }else{
            res.json({"message": "Admin not exist !"})
        }
    }

    
}

module.exports = new adminController()