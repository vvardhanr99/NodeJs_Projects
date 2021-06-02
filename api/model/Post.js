const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String  
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    data:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Posts',postSchema)