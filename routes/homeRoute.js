var express = require('express')
var router = express.Router()

var dbQueries = require('./../database/dbQueries')

router.get('/', async (req, res) => {
    if(req.session.userID) {
        let allProducts = await dbQueries.getAllProducts()
        res.render('home.hbs', {
            allProducts: allProducts,
            userID: req.session.userID
        })
    }
    else {
        res.redirect('/login?error=4')
    }
})

module.exports = router