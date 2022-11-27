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
        var email = req.body.email
        const q = `select * from user where username = "${username}"`
        conn.query(q, (err, results)=>{
            if(results.length > 0){
                res.json({"message": "Tai khoan da duoc su dung !"})
            }else{
                next()
            }
        })
    }

    // check exist email ?
    check_email(req, res, next){
        var username = req.body.username
        var email = req.body.email
        const q = `select * from user where  Email = "${email}"`
        conn.query(q, (err, results)=>{
            if(results.length > 0){
                res.json({"message": "Email da duoc su dung !"})
            }else{
                next()
            }
        })
    }

    // register
    register_account(req, res){
        var name = req.body.name
        var email = req.body.email
        var username = req.body.username
        var password = req.body.password

        const q = `insert into user(Name, Email, role, username, password ) values("${name}", "${email}", "customer", "${username}", "${password}")`
        conn.query(q, (err, results)=>{
             if(!err){
                res.json({"message":"Dang ky tai khoan thanh cong !","status":"done"})
             }else{
                res.json({
                    "message": "Khong the tao tai khoan !",
                    "Error": err,
                })
            }
        })
    }


}

module.exports = new register();
