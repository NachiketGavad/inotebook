const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
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

module.exports = router