const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    // Creation of user
    create: (req, res, next) => {
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, (err, result) => {
            if (err) {
                next (err)
            }
            else {
                res.json({
                    status: "success",
                    message: "User Added!",
                    data: null
                })
            }
        })
    },
    // Authentication on user login attempt
    authenticate: (req, res, next) => {
        userModel.findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, userInfo) => {
            if (err) {
                next (err)
            } else {
                if (bcrypt.compareSync(req.body.email, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' })

                    res.json({
                        status:"success",
                        message: "User Signed in",
                        data: {
                            user: userInfo,
                            token: token
                        }
                    })
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!",
                        data: null
                    })
                }
            }
        })
    }
}