const express = require('express')
const router=express.Router()
const Post = require('../model/Post')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {registerValidation,loginValidation} = require('../validation')




router.get('/post',async(req,res)=>{
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json(err)
    }
})
//posting json 
router.post('/post',async(req,res)=>{
    
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //console.log(req.body)
    //if email already exist
    const emailExist = await Post.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already Exist')
    //User name exist
    const nameExist = await Post.findOne({name:req.body.name})
    if(nameExist) return res.status(400).send('UserName already Exist')
    //hashing the password
    const hashpassword = await bcrypt.hash(req.body.password,10)
    const user = new Post({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    })
    try{
   const savePost=await user.save()
       res.json(savePost)
    }catch(err){
        res.json({message:err})
    }
})
router.post('/login', async (req,res)=>{
    const {error} =  loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //email not exist
    const {name,password}= await req.body
    const user = await Post.findOne({name})
    if(!user) return res.status(400).send('Invalid Username Or Password')
    //console.log(user.password)
    const validpass = await bcrypt.compare(password,user.password)
    if(!validpass) return res.status(400).send('Invalid Password')
    
    const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)
    
})

module.exports = router