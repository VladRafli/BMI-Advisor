const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const bcrypt = require('bcrypt')
const User = require('./model/User')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const PORT = 5000 || process.env.PORT
const dbPath = '../database'
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(cookieParser())

app.get('/', (req, res) => {
    if (req.session.userId === 1)
        res.send('This is BMI Advisor API Endpoint, API is under development, currently logged in as Admin! Proceed with caution.')
    else
        res.send(`This is BMI Advisor API Endpoint, API is under development, currently logged in as ${req.session.username}`)
});

app.get('/users', (req, res) => {
    // If Admin
    if (req.session.userId === 1) {
        if (req.query.id == null) {
            try {
                res.send(User.getUser())
            } catch (err) {
                console.error(err)
                res.status(500).send({
                    err: err
                })
            }
        } else if (req.query.id != null && Number.isInteger(parseInt(req.query.id))) {
            try {
                User.getUser().forEach(user => {
                    if (user.userId === parseInt(req.query.id)) {
                        res.send({
                            userId: user.userId,
                            userInformation: user.userInformation
                        })
                        return;
                    }
                    res.send({
                        msg: 'Data not found'
                    })
                })
            } catch (err) {
                console.error(err)
                res.status(500).send({
                    err: err
                })
            }
    
        } else {
            res.status(500).send('Request is invalid')
        }
    } 
    // If not Admin
    else {
        try {
            User.getUser().forEach(user => {
                if (user.userId === req.session.userId) {
                    res.send({
                        userId: user.userId,
                        userInformation: user.userInformation,
                        status: user.status,
                        advice: user.advice
                    })
                    return;
                }
                res.send({
                    msg: 'Data not found'
                })
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                err: err
            })
        }
    }
})

app.post('/users/login', (req, res) => {
    const { username, password } = req.body
    try {
        if (!req.session.userId) {
            User.getUser().forEach(user => {
                if (user.username === username && bcrypt.compareSync(password, user.password)) {
                    req.session.userId = user.userId
                    req.session.username = user.username
                    res.status(200).send('User logged in!')
                    return
                }
                res.status(403).send('Wrong username or password!')
            })
        } else {
            res.status(200).send()
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
        res.status(201).send('New users created!')
    } catch (err) {
        console.error(err)
        res.status(500).send({
            err: err
        })
    }
})

app.get('/users/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy()
        res.status(200).send('User logged out!')
    } else {
        res.status(400).send('No user need to be logged out!')
    }
})

app.listen(PORT, () => {
    console.log(`Server started on localhost port ${PORT}`)
})