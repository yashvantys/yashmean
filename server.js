const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const auth = require('./auth')
const userRoutes = require('./api/routes/users')
const contentRoutes = require('./api/routes/contents');
const contactRoutes = require('./api/routes/contact');
const todoRoutes = require('./api/routes/todo');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// mongodb connection
mongoose.connect('mongodb://mahika:mahika123@ds215370.mlab.com:15370/survey_compass', (err) => {
    if (!err) {
        console.log('connected to mongo server')
    }
})

// routes
app.use('/auth', auth.router);
app.use('/users', userRoutes);
app.use('/contents', contentRoutes);
app.use('/contact', contactRoutes);
app.use('/todo', todoRoutes);


// error handling
app.use((req, res, next) => {
    const error = new Error('Bad request')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})



// listen server port
app.listen(process.env.PORT || 5000)