const app = require('express')()
const port = process.env.port || 2000
const handle = require('./handlers')

app.use(handle.notFound)
app.use(handle.error)

app.listen(port, () =>{
    console.log("Running on Port: ", port)
})