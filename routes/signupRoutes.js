var express = require('express')
var router = express.Router()

var dbQueries = require('./../database/dbQueries')

router.get('/', (req, res) => {
    res.render('signup.hbs')
})

router.post('/', async (req, res) => {
    var id = req.body.signupID
    var password = req.body.signupPassword
    var confirmPassword = req.body.signupConfirmPassword

    if(password !== confirmPassword) {
        console.log('Error Code 1')
        res.redirect('/signup?error=1')
    }
    else {
        await dbQueries.createNewAccount(id, password)
        res.redirect('/login?accountcraeted')
    }
})

module.exports = router