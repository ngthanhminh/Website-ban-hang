const express = require('express')

const adminController = require('../../../app/controller/admin/admin.controller')
const categoryController = require('../../../app/controller/web/category.controller')

const router = express.Router()

    // get information for admin page
router.get('/', adminController.index)

    



module.exports = router;