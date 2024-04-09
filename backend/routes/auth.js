const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwt_Secret = "Nachiketis$good";

// Route : Create User
// Create a User using POST : "/api/auth" doesn't require Authentication
router.post('/CreateUser',[
    body('name','Enter valid name').isLength({min:3}),
    body('email','Enter valid email').isEmail(),
    body('password','Enter valid password').isLength({min:5}),
],
async (req,res)=>{
    // console.log(req.body);
    const error = validationResult(req);
    // const user = User(req.body);
    // user.save()
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    try{
        // check user exists
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const sec_pass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:sec_pass,
        })

        const data = {
            user : {
                id :user.id,
            }
        };
        // sign jwt token
        const auth_token = jwt.sign(data,jwt_Secret);

        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'please enter unique value for email',message:err.message})

        // res.json(user);
        res.json({auth_token});
    }
    catch(error){
        res.status(400).json({error:"Email already exists"});
    }
    // res.send(req.body);
});


// Route : Login User
// Create a User using POST : "/api/auth" doesn't require Authentication
router.post('/LoginUser',[
    body('email','Please Give Valid Details').isEmail(),
    body('password','Please Give Valid Details').exists(),
],
async (req,res)=>{

    // check error
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    // can also be mapped like this
    // const { email, password } = req.body;
    try{
        // check user exists
        let user = await User.findOne({"email":req.body.email});
        if(!user){
            return res.status(400).json({error:"Please Give Valid Details"});
        }

        // password compare
        // console.log(user)
        const passwordcompare = await bcrypt.compare(req.body.password,user.password);
        if(!passwordcompare){
            return res.status(400).json({error:"Please Give Valid Details"});
        }

        const data = {
            user : {
                id :user.id,
            }
        };
        
        const auth_token = jwt.sign(data,jwt_Secret);

        res.json({auth_token});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
});


// Route get user using middleware, for reusability

router.post('/GetUser',fetchuser,async (req,res)=>{
    try{
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    }
    catch(error){
        console.log(error);
        res.status(500).send({error:"internal server error"});
    }
});

module.exports = router