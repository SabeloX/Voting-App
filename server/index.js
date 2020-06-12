require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const handle = require('./handlers')
const bodyParser = require('body-parser')
const database = require('./models')
const routes = require('./routes')

const port = process.env.port

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', routes.auth)
app.use('/api/polls', routes.poll)

app.use(handle.error)
app.use(handle.notFound)

app.listen(port, () =>{
    console.log("Running on Port: ", port)
})