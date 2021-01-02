var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    if(req.session.userID) {
        req.session.destroy()
        console.log('Session Destroyed')
        res.redirect('/login?logoutsuccess')
    }
})

module.exports = router