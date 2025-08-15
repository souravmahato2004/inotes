const express=require('express');
const Notes=require('../models/Notes');
const router=express.Router();
const fetchuser=require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Route1 for fetching notes
router.get('/fetchnotes',fetchuser,async (req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.send(notes);
});

// Route2 for adding notes
router.post('/addnote',[
    body('title','Enter a valid name').isLength({min:3}),
    body('description','Description must be of atleast 5 characters').isLength({min:5}),
],fetchuser, async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        const errors=validationResult(req);
        if(! errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});   
        }
        const notes=new Notes({
            title, description, tag, user:req.user.id
        });
        const saveNotes=await notes.save();
        res.json(saveNotes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
});

// Route3 for updating existing notes
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
    const {title,description,tag}=req.body;
    try {
        const newnote={};
        if(title) {newnote.title=title};
        if(description) {newnote.description=description};
        if(tag) {newnote.tag=tag};

        let note=await Notes.findById(req.params.id);
        if(!note) res.status(404).send("Not found");
        if(note.user.toString()!=req.user.id) return res.status(401).send("Not authorized");
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

// Route4 for deleting notes
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
    try {
        let note=await Notes.findById(req.params.id);
        if(!note) res.status(404).send("Not found");

        if(note.user.toString()!=req.user.id) return res.status(401).send("Not authorized");

        note=await Notes.findByIdAndDelete(req.params.id,{new:true})
        res.json({"Success!":" Note has been deleted",note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports= router;