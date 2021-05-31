const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
//const {registerValidation} = require('../validation')
const Joi = require('@hapi/joi')

//schema
const schema ={
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).email().required(),
    password:Joi.string().min(6).required()
}
//getting register
router.get('/register',async (req,res)=>{
    try{
        const show = await User.find()
        res.send(show)
    }catch(err){
        res.status(400).send({message:err})
    }
})
//posting registered
router.post('/register',async (req,res)=>{
    //console.log(req.body)
    const salt = await bcrypt.genSaltSync(10)
    const hashpassword = await bcrypt.hash(req.body.password,salt)
    const user = new User ({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    })
    
    try{
        //const password = await bcrypt.hash(password,10)
        const result = await user.save() 
        res.send(result)
        res.json("Data Send Successfully ")

    }catch(err){
        res.status(400).send({message:err})
        res.json('Error While Sending Data')
    }
    return res.redirect('signup.html')
}) 
router.post('/login',async(req,res)=>{
    //UserName Validating
    const {name,password} = await req.body
    const user = await User.findOne({name})
    if(!user) return res.status(400).send('Invalid User Name / Password')
    //Password Validating
     validpass = await bcrypt.compare(password, user.password) 
    if(!validpass) return res.status(400).json("Invalid Password")
    try{
        res.json('Logedin Success')
    }catch(err){
        res.status(400).json({message:err})
    }
})
module.exports = router