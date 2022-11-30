const { render } = require('ejs')
const conn = require('../../config/connect')

class customerController {
    index(req, res){
        
    }

    // get all customer
    getAllCustomers(req, res){
        const q = `SELECT * FROM user where role = 'customer'`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"customers" : results})
            }else{
                res.json({"message" :"Can't get all customer !"})
            }
        })
    }

    // get detail customer
    getCustomer(req, res){
        var idCustomer = req.params.idCustomer
        if(idCustomer){
            const q = `SELECT * FROM user where idUser = ${idCustomer} and role = "customer"`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        res.json({"customer": results})
                    }else{
                        res.json({"Error": new Error('No data with table catgory')})
                    }
                }
            )
        }else{
            res.json({"message": "Customer not exist !"})
        }
    }

    // check customer 
    checkCustomer(req, res, next){
        var idUser = req.params.idCustomer
        if(idUser){
            const q = `select * FROM user where idUser = ${idUser} and role = "customer"`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        next()
                    }else{
                        res.json({"message": "Customer not exist !"})
                    }
                }
            )
        }else{
            res.json({"message": "Customer not exist !"})
        }
    }

    // check add customer 
    checkAddCustomer(req, res, next){
        var idUser = req.body.idUser
        if(idUser){
            const q = `select * FROM user where idUser = ${idUser} and role = "customer"`
                conn.query(q, (err, results)=>{
                    if(results.length > 0){
                        res.json({"message": "Customer exist !"})
                    }else{
                        next()
                    }
                }
            )
        }else{
            res.json({"message": "Customer not exist !"})
        }
    }

    // add customer
    addCustomer(req, res){
        const idUser = req.body.idUser
        const Name = req.body.Name
        const Birthday = req.body.Birthday
        const Gender = req.body.Gender
        const Address = req.body.Address
        const Phone = req.body.Phone
        const Email = req.body.Email
        const username = req.body.username
        const password = req.body.password

        const q = `insert into user values(${idUser}, "${Name}", "${Birthday}", "${Gender}", "${Address}", "${Phone}", "${Email}", "customer", "${username}", "${password}" )`
        conn.query(q, (err, results)=>{
            if(!err){
                res.json({"message": "Added customer !"})
            }else{
                // console.log(err)
                res.json({"message": "Cant add customer !"})
            }
        }) 
    }

    // update customer
    updateCustomer(req, res){
        const idUser = req.params.idCustomer
        const Name = req.body.Name
        const Birthday = req.body.Birthday
        const Gender = req.body.Gender
        const Address = req.body.Address
        const Phone = req.body.Phone
        const Email = req.body.Email
        const username = req.body.username
        const password = req.body.password

        const q = `update user 
            set Name = "${Name}", 
            Birthday = "${Birthday}",
            Gender = "${Gender}",
            Address = "${Address}",
            Phone = "${Phone}",
            Email = "${Email}",
            username = "${username}",
            password = "${password}"
            where idUser = ${idUser} and role = "customer"`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Updated customer !"})
                }else{
                    console.log(err)
                    res.json({"message": "Cant update customer !"})
                }
            })         
    }

    // delete cutomer cart
    deleteCustomerCart(req, res, next){
        var idUser = req.params.idCustomer
        const q = `delete from cart where idUser = ${idUser}`
        conn.query(q, (err, results)=>{
            if(!err){
                next()
            }else{
                console.log(err)
                res.json({"Error": new Error("Can't delete customer cart!")})
            }
        })
    }

    // delete cutomer
    deleteCustomer(req, res){
        var idUser = req.params.idCustomer
        const q = `delete from user where idUser = ${idUser} and role = "customer"`
            conn.query(q, (err, results)=>{
                if(!err){
                    res.json({"message": "Deleted customer !"})
                }else{
                    console.log(err)
                    res.json({"Error": new Error("Can't delete customer !")})
                }
            })


    }

    // search customer
    searchCustomer(req, res){
        var Name = req.params.customerName
        const q = `select * from user where Name like("%${Name}%") and role = "customer"`
        conn.query(q, (err, results)=>{
            if(results){
                res.json({"customers": results})
            }else{
                res.json({"message" : 'Cant not find... !'})
            }
        })
    }

}

module.exports = new customerController()