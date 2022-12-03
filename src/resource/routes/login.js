const express = require('express')
const cookieParser = require('cookie-parser')

// const siteController = require('../../app/controller/siteController')
const loginController = require('../../app/controller/web/login')
// const gioHangController = require('../../app/controller/gioHangController')

const router = express.Router()

    // get information for login page
router.get('/', loginController.index)

        // verify login
      .post('/', loginController.auth_account, loginController.auth)


module.exports = router;