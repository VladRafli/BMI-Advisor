const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const bcrypt = require('bcrypt')
const User = require('./model/User')
const SessionList = require('./model/Session')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// ==========
// Constants
// ==========

const PORT = 5000 || process.env.PORT
const app = express()


// ================
// Custom Middlewares
// ================

/**
 * Check if Client is Logged in
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function isLoggedIn(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.cookies.sessionId === undefined) {
        res.status(403).send('<h1>Forbidden</h1>')
    } else {
        next()
    }
}

/**
 * Check if Request Method is Allowed
 * 
 * Reference: https://cheatcode.co/tutorials/how-to-implement-secure-httponly-cookies-in-node-js-with-express
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function isAllowedRequestMethods(req, res, next) {
    const allowedMethods = [
        "OPTIONS",
        "HEAD",
        "CONNECT",
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
    ];

    if (!allowedMethods.includes(req.method)) {
        res.status(405).send(`${req.method} not allowed.`)
    }

    next()
}

// =============
// Use Middlewares
// =============

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(cookieParser(
    process.env.SECRET
))
app.use(isAllowedRequestMethods)

// ================
// API Routes
// ================
app.get('/', (req, res) => {
    if (req.cookies.userId === '1')
        res.send('This is BMI Advisor API Endpoint, API is under development, currently logged in as Admin! Proceed with caution.')
    else if (req.cookies.userId !== undefined)
        res.send(`This is BMI Advisor API Endpoint, API is under development, currently logged in as user id: ${req.cookies.userId}`)
    else
        res.send(`This is BMI Advisor API Endpoint, API is under development, currently not logged in`)
});

app.get('/users', isLoggedIn, (req, res) => {
    // If Admin
    if (req.cookies.userId === 1) {
        if (req.query.id == null) {
            try {
                res.status(200).send(User.getUser())
                return
            } catch (err) {
                console.error(err)
                res.status(500).send({
                    err: err
                })
                return
            }
        } else if (req.query.id != null && Number.isInteger(parseInt(req.query.id))) {
            try {
                for (let user of User.getUser()) {
                    if (user.userId === parseInt(req.query.id)) {
                        res.status(200).send({
                            userId: user.userId,
                            userInformation: user.userInformation,
                            status: user.status,
                            advice: user.advice
                        })
                        return
                    }
                    res.status(200).send({
                        msg: 'Data not found'
                    })
                    return
                }
            } catch (err) {
                console.error(err)
                res.status(500).send({
                    err: err
                })
                return
            }
        } else {
            res.status(500).send({
                msg: 'Request is invalid'
            })
            return
        }
    }
    // If not Admin
    else if (req.cookies.userId !== undefined) {
        try {
            for (let user of User.getUser()) {
                if (user.userId === parseInt(req.cookies.userId)) {
                    res.status(200).send({
                        userId: user.userId,
                        userInformation: user.userInformation,
                        status: user.status,
                        advice: user.advice
                    })
                    return
                } else {
                    res.status(500).send({
                        msg: 'Data not found for userId=' + parseInt(req.cookies.userId)
                    })
                    return
                }
            }
        } catch (err) {
            console.error(err)
            res.status(500).send({
                err: err
            })
            return
        }
    }
})

app.post('/users/login', (req, res) => {
    const { username, password } = req.body
    try {
        if (req.cookies.userId === undefined) {
            for (let user of User.getUser()) {
                if (user.username === username && bcrypt.compareSync(password, user.password)) {
                    let sessionId = SessionList.setSession(user.userId)
                    if (sessionId !== false) {
                        res
                            .status(200)
                            .cookie('sessionId', sessionId, {
                                httpOnly: true
                            })
                            .cookie('userId', user.userId, {
                                httpOnly: true
                            })
                            .send({
                                msg: 'User successfully logged in!'
                            })
                        return
                    } else {
                        console.log('Login error on set Session ID, already saved on database')
                        res.status(500).send({
                            msg: 'Login error on set Session ID, already saved on database'
                        })
                        return
                    }
                }
                res.status(500).send({
                    msg: 'Wrong username or password!'
                })
                return
            }
        } else {
            res.status(200).send({
                msg: 'User already logged in!'
            })
            return
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.post('/users/register', (req, res) => {
    const { username, password, userInformation } = req.body
    let newUser = {}
    try {
        newUser.userId = User.getUser()[User.getUser().length - 1].userId + 1
        newUser.username = username
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        newUser.userInformation = userInformation
        newUser.status = 'Not Checked'
        newUser.advice = []
        User.addUser(newUser)
        res.status(201).send({
            msg: 'New users created!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.get('/users/isloggedin', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    if (req.cookies.userId === undefined) {
        res.status(200).send(false)
    } else if (typeof parseInt(req.cookies.userId) === 'number') {
        res.status(200).send(true)
    } else {
        res.status(500).send({
            msg: "Something wrong with the cookies"
        })
    }
})

app.get('/users/logout', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    if (req.cookies.userId !== undefined) {
        SessionList.deleteSession(req.cookies.userId)
        res.clearCookie('userId')
        res.clearCookie('sessionId')
        res.status(200).send({
            msg: 'User logged out!'
        })
    } else {
        res.status(400).send({
            msg: 'No user need to be logged out!'
        })
    }
})

app.get('/users/profile', isLoggedIn, (req, res) => {
    try {
        if (req.query.id != null) {
            res.status(200).send(User.getUserById(req.query.id))
        } else {
            res.status(400).send({
                msg: 'Need url param of \"id\"'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.post('/users/profile', isLoggedIn, (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
        dob,
        height,
        weight
    } = req.body
    try {
        if (req.query.id != null) {
            let user = User.getUserById(req.query.id);
            user.username = username
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            user.firstName = firstName
            user.lastName = lastName
            user.dob = dob
            user.height = height
            user.weight = weight
            User.setUser(req.query.id, user)
            res.status(200).send({
                msg: 'User profile successfully changed'
            })
        } else {
            res.status(400).send({
                msg: 'Need url param of \"id\"'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.post('/users/advice', isLoggedIn, (req, res) => {
    const { advice } = req.body
    try {
        if (req.query.id != null) {
            User.addUserAdvice(req.query.id, advice)
            res.status(200).send({
                msg: 'Advice successfully added'
            })
        } else {
            res.status(400).send({
                msg: 'Need url param of \"id\"'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.put('/users/advice', isLoggedIn, (req, res) => {
    const { advice } = req.body
    try {
        if (req.query.id != null) {
            User.setUserAdvice(req.query.id, advice)
            res.status(200).send({
                msg: 'Advice successfully changed'
            })
        } else {
            res.status(400).send({
                msg: 'Need url param of \"id\"'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.put('/users/bmi', isLoggedIn, (req, res) => {
    const { bmi } = req.body
    try {
        if (req.query.id != null) {
            User.setUserBMIStatus(req.query.id, bmi)
            res.status(200).send({
                msg: 'Advice successfully changed'
            })
        } else {
            res.status(400).send({
                msg: 'Need url param of \"id\"'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on localhost port ${PORT}`)
})