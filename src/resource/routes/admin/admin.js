const express = require('express')

const adminController = require('../../../app/controller/admin/admin.controller')


const router = express.Router()

router.get('/', adminController.index)



module.exports = router;