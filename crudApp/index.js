const express = require('express')
const port = process.env.PORT || 5001
const userRouter = require('./routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Middlewares
const app = express()

app.get('/' , (req , res)=>{

   res.send('Welcome')

})
//converting to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
//Using user Router
app.use('/user',userRouter)




//connecting to db
mongoose.connect('mongodb://localhost:27017/newdb',{ useNewUrlParser: true, useUnifiedTopology: true  },()=>{
    console.log(">>Database is connected")
})

//server Listening
app.listen(port ,()=>{
    console.log(`>>Server is Up And Runnibg on ${port}`)
})