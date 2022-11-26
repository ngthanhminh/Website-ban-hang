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
        // return res.redirect('/home')
        // console.log("done !")
    }

    // verify login
    auth_account_remember(req, res, next) {
        var user_token = req.cookies.user_token
        if(user_token){
            try{
                const idCustomer = jwt.verify(user_token, process.env.KEY_TOKEN)
                if(idCustomer){
                    const q = `SELECT * FROM account WHERE idCustomer = "${idCustomer}"`
                    conn.query(q, (err, results)=>{
                        if(results.length > 0){
                            next()
                        }else{
                            return res.redirect('/login')
                        }
                    })
                }
            }
            catch(err){
                return res.redirect('/login')
            }

        }else{
            return res.redirect('/login')
        }
    }

    // verify account
    auth_account(req, res, next){
        const q = `SELECT * FROM account WHERE username = "${req.body.username}" and password = "${req.body.password}"`
        conn.query(q, (err, results)=>{
             if(results.length > 0){
                if(results[0].idCustomer){
                    const token = jwt.sign(results[0].idCustomer, process.env.KEY_TOKEN)
                    res.json({"tokenUser": token})
                    next()
                }
                if(results[0].idAdmin){
                    const token = jwt.sign(results[0].idAdmin, process.env.KEY_TOKEN)
                    res.json({"tokenAdmin": token})
                    next()
                }
             }
             else{
                res.json({"message": "Tai khoan hoac mat khau khong chinh xac !"})
                next()
            }
        })
    }
    
}

module.exports = new login();
