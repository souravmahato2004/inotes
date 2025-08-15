const express=require('express');
const User=require('../models/User')
const { default: mongoose } = require('mongoose');
const { body, validationResult } = require('express-validator');
const router= express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser');

const JWT_SECRET="heyIamNotAGay";

// route1 for create user
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be of atleast 8 characters').isLength({min:8}),
],async (req,res)=>{
    const errors=validationResult(req);
    if(! errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});   
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry user is already exist"})
        }
        const salt=await bcrypt.genSalt(10);
        const securePass=await bcrypt.hash(req.body.password, salt);
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securePass,     
        });
        const data={
            user:{
                id:user.id
            }
        }
        const jwtData=jwt.sign(data,JWT_SECRET);
        res.json({jwtData});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

    // res.send(req.body);
    // const user=User(req.body);
    // user.save();
})

// route 2 for login credentials
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cant be blank').exists(),
],async (req,res)=>{
    const errors=validationResult(req);
    if(! errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});   
    } 
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({error:"Try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            res.status(400).json({error:"Try to login with correct credentials"});
        }

        const data={
            user:{
                id:user.id
            }
        }
        const jwtData=jwt.sign(data,JWT_SECRET);
        res.json({jwtData});
    }
    catch(err){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})

// route3 for get user details
router.post('/getuser',fetchuser, async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(err){
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
})

module.exports=router;