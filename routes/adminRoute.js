var express = require('express')
var router = express.Router()

var dbQueries = require('../database/dbQueries')

router.post('/deleteproduct', async (req, res) => {

    var productName = req.body.product_name

    await dbQueries.deleteProduct(productName)

    res.redirect('/admin/deleteproduct')
})

router.get('/deleteproduct', (req, res) => {
    res.render('deleteproduct.hbs')
})


router.post('/deleteproduct', async (req, res) => {

    var productName = req.body.product_name

    await dbQueries.delProduct(productName)

    res.redirect('/deleteproduct')
})

router.get('/deleteproduct', (req, res) => {
    res.render('deleteproduct.hbs')
})

module.exports = router