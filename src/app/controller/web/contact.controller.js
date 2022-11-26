const conn = require('../../config/connect')

class contactController {
    index(req, res) {
        res.render('layouts/main', { 
            "page": "contact", 
            "title": "contact",
            "cart": [], 
        })
    }

}

module.exports = new contactController()