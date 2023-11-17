require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const seriesRoutes = require('./routes/series')
const chapterRoutes = require('./routes/chapter')
const imageRoutes = require('./routes/image')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 10000 }))
app.use(cors())
app.use('/api/series', seriesRoutes)
app.use('/api/chapters', chapterRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/user', userRoutes)
//routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

//connect to db
const username = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const host = process.env.DB_HOST;

const dbUri = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
    })
    .catch((error) => {
        console.log(error)
    })

process.env