require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const boardRoutes = require("./controllers/board.js")
//const LogRequest = require("./middleware/LogRequest.js")


//express app
const app = express()

//middleware
app.use(express.json()) // allows access to request body for post and patch requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//board routes
app.use('/api/boards', boardRoutes)

// db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database")
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

