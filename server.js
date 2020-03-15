const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const movies = require('./routes/movies')
const mongoose = require('./config/db') //db config
const jwt = require('jsonwebtoken')
const app = express()

app.set('secretKey', 'nodeRestApi')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res){
 res.json({"tutorial" : "Build REST API with node.js"})
})


// Setting public routes
app.use('/users', users)

// Private
app.use('/movies', validateUser, movies)

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204)
})

// middleware
function validateUser (req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            res.json({
                status: "errorssss",
                message: err.message,
                data: null
            })
        } else {
            // add User ID to request
            req.body.userId = decoded.id
            next()
        }
    })
}

// Handling Errors
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status(404)
    next(err)
})
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).json({
            message: "Not Found"
        })
    } else {
        res.status(500).json({
            message: "Somethings Wrong"
        })
    }
})


app.listen(3000)