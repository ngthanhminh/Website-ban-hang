const exp = require('constants')
const express = require('express')
const nodemon = require('nodemon')
const path = require('path')
require('dotenv').config()
const routeUser = require('./resource/routes/user')
const routeAdmin = require('./resource/routes/admin')
const conn = require('./app/config/connect')
var cookieParser = require('cookie-parser')

const port = process.env.PORT

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/resource/views'))

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

routeUser(app)
routeAdmin(app)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})