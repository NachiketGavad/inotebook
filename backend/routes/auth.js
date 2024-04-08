const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Create a User using POST : "/api/auth" doesn't require Authentication
router.post('/',[
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

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })

        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'please enter unique value for email',message:err.message})
        res.json(user);
    }
    catch(error){
        res.status(400).json({error:"Email already exists"});
    }
    // res.send(req.body);
})

module.exports = router