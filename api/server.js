const express = require('express');
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')

//importing routes
const router = require('./routes/Post');
const postsRouter = require('./routes/posts')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// port
const port = process.env.PORT || 5010;

//default page a.k.a localhost:5010
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})
//mongoose connection
mongoose.connect('mongodb://localhost:27017/sample',{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex: true},()=>
    console.log(`>>>Connected to database`)
)
//express Listening
app.use('/api',router)
app.use('/posts',postsRouter)
//server Listening
app.listen(port,()=>{console.log(`>>Server is listening at ${port}`)})