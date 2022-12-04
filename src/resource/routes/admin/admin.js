const express = require('express')

const adminController = require('../../../app/controller/admin/admin.controller')
const categoryController = require('../../../app/controller/web/category.controller')

const router = express.Router()

    // get information for admin page
router.get('/', adminController.auth_account_Admin, adminController.index)

    // get infomation admin
    .post('/info', adminController.info)

    // update admin 
    .put('/:idAdmin', adminController.checkAdmin, adminController.updateAdmin )


module.exports = router;