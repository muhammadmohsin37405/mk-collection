var express = require('express')
var router = express.Router()
const { v1: uuidv1 } = require('uuid')
var dbQueries = require('../database/dbQueries')
var path = require('path')

router.post('/deleteproduct', async (req, res) => {

    var productName = req.body.product_name

    await dbQueries.deleteProduct(productName)

    res.redirect('/admin/deleteproduct')
})

router.get('/deleteproduct', (req, res) => {
    res.render('deleteproduct.hbs')
})

router.post('/addproduct', async (req, res) => {
    var productName = req.body.product_name
    var productPrice = req.body.product_price
    var productImage1 = req.files.productimage_1
    var productImage2 = req.files.productimage_2

    var ext1 = productImage1.name.split(".")
    var ext2 = productImage2.name.split(".")

    var randomName1 = uuidv1() + "." + ext1[ext1.length - 1]
    var randomName2 = uuidv1() + "." + ext2[ext2.length - 1]

    productImage1.name = randomName1
    productImage2.name = randomName2

    var uploadPath = path.join(__dirname, '../', 'public/images/', productImage1.name)
    productImage1.mv(uploadPath, (err) => {
        
    })

    uploadPath = path.join(__dirname, '../', 'public/images/', productImage2.name)
    productImage2.mv(uploadPath, (err) => {
        
    })

    await dbQueries.addNewProduct(productName, productPrice, 'images/'+ productImage1.name, 'images/'+ productImage2.name)

    res.redirect('addproduct')
})

router.get('/addproduct', (req, res) => {
    res.render('addproduct.hbs')
})

module.exports = router