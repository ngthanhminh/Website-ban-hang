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
                    res.json({"Error" :new Error('No data with table catgory')})
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
                    res.json({"Error" :new Error('No data with table catgory')})
                }
            })
    }

    // check before add category 
    checkBeforeAdd(req, res, next){
        var idCategory = req.body.idCategory
        const q = `select * FROM category where idCategory = ${idCategory}`
            conn.query(q, (err, results)=>{
                if(results.length > 0){
                    res.json({"message": "Category already exists !"})
                }else{
                    next()
                }
            })
    }

    // add category
    addCategory(req, res, next){
        var idCategory = req.body.idCategory
        var categoryName = req.body.categoryName
        var forGender = req.body.forGender
        const q = `insert into category values(${idCategory}, "${categoryName}", "${forGender}")`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message" : "Added category !"})
                }else{
                    res.json({"Error" :new Error('cant delete catgory')})
                }
            })
    }

    // check category
    checkCategory(req, res, next){
        var idCategory = req.params.idCategory
        const q = `select * FROM category where idCategory = ${idCategory}`
            conn.query(q, (err, results)=>{
                if(results){
                    next()
                }else{
                    res.json({"Error" :new Error('Not exist category !')})
                }
            })
    }

    // update category
    updateCategory(req, res, next){
        var idCategory = req.params.idCategory
        var categoryName = req.body.categoryName
        var forGender = req.body.forGender
        const q = `update category set categoryName = "${categoryName}", forGender = "${forGender}" where idCategory = ${idCategory}`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message" : "Updated category !"})
                }else{
                    res.json({"Error" :new Error('cant delete catgory')})
                }
            })
    }

    // delete category
    deleteCategory(req, res){
        var idCategory = req.params.idCategory
        new Promise((resolve, reject)=>{
            const q1 = `delete FROM product where idCategory = ${idCategory}`
            conn.query(q1, (err, results)=>{
                if(!err){
                    resolve({'message': 'Deleted all product in category !'})
                }else{
                    reject({"message": "Can't delete all product in category !"})
                }
            })
        })
        .then(data=>{
            const q2 = `delete FROM category where idCategory = ${idCategory}`
            conn.query(q2, (err, results)=>{
                if(!err){
                    res.json({"message" : "Deleted category !"})
                }else{
                    res.json({"Error" :new Error('cant delete catgory')})
                }
            })
        })
        .catch(err=>{
            res.json({"Error": err})
        })
    }


    // search category
    search(req, res){
        var categoryName = req.params.categoryName
        const q = `select * FROM category where categoryName like("%${categoryName}%") `
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"categories": results})
            }else{
                res.json({"message" : 'Cant not find... !'})
            }
        })
    }

    //

}

module.exports = new categoryController()