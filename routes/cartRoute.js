var express = require('express')
var router = express.Router()

var dbQueries = require('../database/dbQueries')

router.get('/', async (req, res) => {
    if(req.session.userID) {
        let productsInCart = await dbQueries.getProductsFromCart(req.session.userID)
        res.render('cart.hbs', {
            productsInCart: productsInCart,
            userID: req.session.userID
        })
    }
    else {
        res.redirect('/login?session_expired')
    }
})

router.post('/remove-product', async (req, res) => {
    if(req.session.userID) {
        let productID = req.body.productID
        await dbQueries.removeProductFromCart(productID, req.session.userID)
        res.sendStatus(200)
    }
    else {
        res.redirect('/login?session_expired')
    }
})

router.post('/confirm_order', async (req, res) => {
    
    let allProducts = JSON.parse(req.body.p)
    let total = req.body.total
    let user = JSON.parse(req.body.user)

    let row = await dbQueries.insertIntoSales(req.session.userID, total, user.firstName, user.lastName, user.email, user.address, user.contact)
    for(let i = 0; i < allProducts.length; i++) {
        await dbQueries.insertIntoSubSales(row.insertId, allProducts[i].id, allProducts[i].quantity, allProducts[i].price, allProducts[i].quantity * allProducts[i].price)
    }
    await dbQueries.resetCartAfterOrderConfirm(req.session.userID)
    res.sendStatus(200)
})

module.exports = router