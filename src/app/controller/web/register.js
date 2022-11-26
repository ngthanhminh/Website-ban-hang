const conn = require('../../config/connect')

class register {
    index(req, res){
        res.render('layouts/login-register', { 
            "page": "register", 
            "title": "register",
        })
    }

    // check exist account ?
    check_account(req, res, next){
        var username = req.body.username
        const q = `select * from user where username = ${username}`
        conn.query(q, (err, results)=>{
            if(results.length > 0){
                res.status(400).json({"message": "Tai khoan da ton tai !"})
            }else{
                next()
            }
        })
    }

    register_account(req, res){
        var name = req.body.name
        var email = req.body.email
        var username = req.body.username
        var password = req.body.password

        const q = `insert into user(Name, Email, role, username, password ) value (${name}, ${email}, "customer", ${username}, ${password})`
        conn.query(q, (err, results)=>{
             if(!err){
                res.render('layouts/login-register', { 
                    "page": "register", 
                    "title": "register",
                })
             }else{
                res.status(400).json({"message": "Khong the tao tai khoan !"})
            }
        })
    }


}

module.exports = new register();
