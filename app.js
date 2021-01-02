// Imports
var express = require('express')
var expressSession = require('express-session')
var hbs = require('hbs')
var bodyParser = require('body-parser')
var app = express()
var loginRoute = require('./routes/loginRoute')
var signupRoute = require('./routes/signupRoutes')
var homeRoute = require('./routes/homeRoute')
var adminRoute = require('./routes/adminRoute')
var logoutRoute = require('./routes/logoutRoute')
var cartRoute = require('./routes/cartRoute')

var dbQueries = require('./database/dbQueries')

// Settings
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({ secret: 'secret_key', saveUninitialized: false, resave: false }))
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/home', homeRoute)
app.use('/admin', adminRoute)
app.use('/logout', loginRoute)
app.use('/cart', cartRoute)

// Route
app.get('/', (req, res) => {
    res.redirect('/login')
})

app.post('/addtocart', async (req, res) => {
    var userID = req.session.userID
    var productID = req.body.productID

    let result = await dbQueries.checkInCart(userID, productID)
    if(result.length > 0) {
        res.sendStatus(6969)
    }   
    else {
        await dbQueries.addToCart(userID, productID)
        res.sendStatus(200)
    }
})

// Server Start
const port = 3000
app.listen(port, () => {
    console.log('Server started at port ' + port)
})