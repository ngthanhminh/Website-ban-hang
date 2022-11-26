const express = require('express')

// const siteController = require('../../app/controller/siteController')
const registerController = require('../../app/controller/web/register')
// const gioHangController = require('../../app/controller/gioHangController')

const router = express.Router()

router.use((req, res, next) => {
    next()
})
    .get('/', registerController.index)
    .post('/', registerController.check_account, registerController.register_account)

module.exports = router;