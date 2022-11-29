const express = require('express')

const cartController = require('../../../app/controller/web/cart.controller')
const categoryController = require('../../../app/controller/web/category.controller')


const router = express.Router()

    // get a category
    router.get('/:idCategory', categoryController.getCategory)

    // add category
    .post('/', categoryController.checkBeforeAdd, categoryController.addCategory)

    // delete category
    .delete('/:idCategory', categoryController.checkCategory, categoryController.deleteCategory)

    // update category
    .put('/:idCategory', categoryController.checkCategory, categoryController.updateCategory)

    // search category
    .get('/search/:categoryName', categoryController.search)

module.exports = router;