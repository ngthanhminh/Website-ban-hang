const { render } = require('ejs')
const conn = require('../../config/connect')

class categoryController {
    index(req, res) {
        const q = `SELECT * FROM website_shopping.category`
        conn.query(q,  (err, results) => {
            res.json({"category": results})
        })
    }

}

module.exports = new categoryController()