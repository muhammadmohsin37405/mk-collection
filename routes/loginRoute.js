var express = require('express')
var router = express.Router()

var dbQueries = require('./../database/dbQueries')

router.get('/', (req, res) => {
    res.render('login.hbs')
})

router.post('/', async (req, res) => {
    var loginID = req.body.loginID
    var loginPassword = req.body.loginPassword

    var results = await dbQueries.checkLogin(loginID, loginPassword)

    if(results.length > 0) {
        req.session.userID = loginID
        res.redirect('/home')
    }
    else {
        res.redirect('/login?error=2')
    }
})

module.exports = router