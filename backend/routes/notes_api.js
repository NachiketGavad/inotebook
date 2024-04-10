const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body,validationResult}  = require('express-validator');


// Route get all notes
router.get('/GetNotes',fetchuser,async (req,res)=>{
    let success=true;
    try{
        const notes = await Note.find({user : req.user.id});
        res.json({success,notes});
    }
    catch(error){
        success=false;
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }
})

// Route Create a note
router.post('/CreateNote',fetchuser,[
    body('title','Title must be length of 3').isLength({min:3}),
    body('description','must be greater').isLength({min:5}),
],async (req,res)=>{
    try{
        const {title,description,tag} = req.body;
    
        const errors = validationResult(req);
        let success=true;
    
        if(!errors.isEmpty()){
            success=false;
            return res.status(400).json({success,errors:errors.array()});
        }

        console.log(req.body)
    
        const note = new Note({
            title, description,tag,user:req.user.id
        })
        
        console.log(note)
        const savenote = await note.save();
        res.send(savenote);

    }
    catch(error){
        success=false;
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }
})

// Route Update note
router.put('/UpdateNote/:id',fetchuser,async (req,res)=>{
    try{
        const {title,description,tag} = req.body;

        // create new empty note
        const newnote = {};
        if(title){newnote.title = title};
        if(description){newnote.description = description};
        if(tag){newnote.tag = tag};

        // find note to be updated
        let note = await Note.findById(req.params.id);
        let success=true;
        if(!note){
            success=false;
            return res.status(404).json({success,error:"Not Found"});
        }
        
        // check user authorized or not
        if(note.user.toString() !== req.user.id){
            success=false;
            return res.status(401).json({success,error:"Not Allowed"});
        }

        // update in db
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newnote},{new:true})
        res.json({success,note});
    }
    catch(error){
        success=false;
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }
})

// Route Delete note
router.delete('/DeleteNote/:id',fetchuser,async (req,res)=>{
    try{
        // find note to be deleted
        let note = await Note.findById(req.params.id);
        let success=true;
        if(!note){
            success=false;
            return res.status(404).json({success,error:"Not Found"});
        }
        
        // check user authorized or not
        if(note.user.toString() !== req.user.id){
            success=false;
            return res.status(401).json({success,error:"Not Allowed"});
        }

        // delete in db
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({note});
    }
    catch(error){
        success=false;
        console.log(error.message);
        res.status(500).json({success,error:"Internal Server Error"});
    }
})

module.exports = router