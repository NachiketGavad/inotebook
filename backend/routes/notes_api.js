const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body,validationResult}  = require('express-validator');


// Route get all notes
router.get('/GetNotes',fetchuser,async (req,res)=>{
    try{
        const notes = await Note.find({user : req.user.id});
        res.json(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(401).send("Server Error");
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
    
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
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
        console.log(error.messae);
        res.status(500).send("Internal Sever Error");
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
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        // check user authorized or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        // update in db
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newnote},{new:true})
        res.json({note});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route Delete note
router.delete('/DeleteNote/:id',fetchuser,async (req,res)=>{
    try{
        // find note to be deleted
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        // check user authorized or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        // delete in db
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({note});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router