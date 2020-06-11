require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port
const handle = require('./handlers')
const cors = require('cors')
const bodyParser = require('body-parser')
const database = require('./models')
const routes = require('./routes')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', routes.auth)

app.use(handle.error)
app.use(handle.notFound)

app.listen(port, () =>{
    console.log("Running on Port: ", port)
})