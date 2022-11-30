const multer = require('multer')
const rootPath = require('app-root-path')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
            cb(null, rootPath + '/src/public/image/')
        }else{
            cb(new Error('Not image...'), rootPath + '/src/public/image/')
        }
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({storage: storage}) 

module.exports = upload