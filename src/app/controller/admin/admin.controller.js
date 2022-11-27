const { render } = require('ejs')
const conn = require('../../config/connect')

class categoryController {
    index(req, res) {
        res.render('layouts/admin', {})
    }

}

module.exports = new categoryController()