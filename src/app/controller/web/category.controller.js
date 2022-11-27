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

    // get all categories
    getCategories(req, res) {
            const q = `SELECT * FROM category`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"categories" : results})
                }else{
                    res.json({"Error" :new Error('no data with table catgory')})
                }
            })
    }

    // get a category 
    getCategory(req, res){
        var idCategory = req.params.idCategory
        const q = `SELECT * FROM category where idCategory = ${idCategory}`
            conn.query(q, (err, results)=>{
                if(results){
                    res.json({"category" : results})
                }else{
                    res.json({"Error" :new Error('no data with table catgory')})
                }
            })
    }

}

module.exports = new categoryController()