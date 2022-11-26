const conn = require('../../config/connect')

class register {
    index(req, res){
        res.render('layouts/login-register', { 
            "page": "register", 
            "title": "register",
        })
    }

}

module.exports = new register();
