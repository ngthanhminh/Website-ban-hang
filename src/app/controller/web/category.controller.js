const conn = require('../../config/connect')

class categoryController {

    getAllCategory() {
        return new Promise((resolve, reject)=>{
            const q = `SELECT * FROM category`
            conn.query(q, (err, results)=>{
                if(results){
                    resolve(results)
                }else{
                    reject(new Error('no data with table catgory'))
                }
            })
        })
    }

    getCategories(req, res) {
        return new Promise((resolve, reject)=>{
            const q = `SELECT * FROM category`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"categories" : results})
                }else{
                    res.json({"Error" :new Error('no data with table catgory')})
                }
            })
        })
    }

}

module.exports = new categoryController()