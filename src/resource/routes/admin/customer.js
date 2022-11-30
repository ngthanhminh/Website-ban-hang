const express = require('express')

// const siteController = require('../../app/controller/siteController')
// const sanPhamController = require('../../app/controller/sanPhamController')
const contactController = require('../../../app/controller/web/contact.controller')
const router = express.Router()

router.get('/', contactController.index)



module.exports = router;