const express = require('express')
const router = express.Router()
const User = require('../model/User')

//GetMethod
router.get('/',async (req,res)=>{
    try{
        const showUser = await User.find()
        res.send(showUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})
//Post Method
router.post('/', async (req,res)=>{
    //res.send('Registered')
    const newUser = new User ({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password 
    })
    try{
        const saveReg = await newUser.save()
        res.send(saveReg)
    }catch(err){
        res.status(400).send({message:err})
    }
})
//FindOne Method
router.get('/:id',async (req,res)=>{
    try{
        const showById = await User.findById(req.params.id)
        res.send(showById)
    }catch(err){
        res.send({err})
    }
})
//deleting 
router.delete('/:id',async (req,res)=>{
    try{
        const remove = await User.remove({_id:req.params.id})
        res.send(remove)
    }catch(err){
        res.status(400).send({message:err})
    }
})
//updating Data
router.patch('/:id',async (req,res)=>{
    try{
        const Updated = await User.updateOne({_id:req.params.id},{$set:{name:req.body.name,email:req.body.email,
            password:req.body.password }})
        res.send(Updated)
    }catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router