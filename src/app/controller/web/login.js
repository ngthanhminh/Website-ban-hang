const conn = require('../../config/connect')
const jwt = require('jsonwebtoken')
const cookies_parser = require('cookie-parser')


class login {

    // render login page
    index(req, res) {
        res.render('layouts/login-register', { 
            "page": "login", 
            "title": "login",
        })
    }

    // auth
    auth(req, res){
        res.json({"message": "Dang nhap thanh cong"})
    }

    // verify login
    auth_account_remember(req, res, next) {
        var user_token = req.cookies.user_token
        if(user_token){
            try{
                const idUser = jwt.verify(user_token, process.env.KEY_TOKEN)
                if(idUser){
                    const q = `SELECT * FROM user WHERE idUser = "${idUser}"`
                    conn.query(q, (err, results)=>{
                        if(results.length > 0){
                            next()
                        }else{
                            res.redirect('/login')
                        }
                    })
                }
            }
            catch(err){
                res.redirect('/login')
            }

        }else{
            res.redirect('/login')
        }
    }

    // verify account
    auth_account(req, res, next){
        const q = `SELECT * FROM user WHERE username = "${req.body.username}" and password = "${req.body.password}"`
        conn.query(q, (err, results)=>{
             if(results.length > 0){
                if(results[0].role == 'customer'){
                    const token = jwt.sign(results[0].idUser, process.env.KEY_TOKEN)
                    res.json({"tokenUser": token})
                }
                if(results[0].role == 'admin'){
                    const token = jwt.sign(results[0].idUser, process.env.KEY_TOKEN)
                    next()
                }
             }
             else{
                res.json({"message": "Tai khoan hoac mat khau khong chinh xac !"})
            }
        })
    }
    
}

module.exports = new login();
