const { render } = require('ejs')
const conn = require('../../config/connect')

class adminController {
    index(req, res) {
        res.render('layouts/admin', {"message": "Welcome to admin page !"})
    }

}

module.exports = new adminController()