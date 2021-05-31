const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5010
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const registerRouter = require('./routes/register')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//Default port
app.use('/',express.static(path.join(__dirname,'public')))
//Router on /api/register
app.use('/api',registerRouter)


//Creting a database
mongoose.connect('mongodb://localhost:27017/login_register',{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true},()=>{
    console.log(`>>Database is on and connected`)
})
//server Listening
app.listen(port,()=>{
    console.log(`>>Server is listening on ${port}`)
})