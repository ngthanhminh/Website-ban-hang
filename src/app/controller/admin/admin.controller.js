const { render } = require('ejs')
const conn = require('../../config/connect')

class adminController {
    index(req, res) {
        res.render('layouts/admin', {})
    }

}

module.exports = new adminController()