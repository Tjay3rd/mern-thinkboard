
import { Note } from "../Models/note.js"


async function getNotes (_, res) {
    try {
        const allnotes = await Note.find().sort({createdAt: -1});
         res.status(200).json(allnotes);
    } catch (error) {
        console.error('Error in getNotes controller', error);
        res.status(500).json({message: 'Internal server error: cannot retrieve notes'});
    }
};

async function getNote (req, res) {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note) return res.status(404).send('Note not found');
         res.status(200).json(note);
    } catch (error) {
        console.error('Error in getNote controller', error);
        res.status(500).json({message: 'Internal server error: cannot retrieve notes'});
    }
};

async function createNote (req, res) {
    try {
        const{title, content} = req.body;
        const newnote = new Note({title, content});
        await newnote.save();
        res.status(201).send(`New Post, ${title}, created successfully`);
    } catch (error) {
        console.log('Error in  createNote controller', error);
        res.status(500).json({message: 'Internal server error: cannot create note'});
    }
};

async function updateNote (req, res) {
    try {
        const{body: {title, content}, params: {id}} = req;
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true});
        if(!updatedNote) return res.status(404).send('Note not found');
        res.status(200).send(`Post,  ${title}, updated successfully`);
    } catch (error) {
         console.error('Error in  updateNote controller', error);
        res.status(500).json({message: 'Internal server error: cannot update note'});
    }
};

async function deleteNote (req, res) {
    try {
        const{id} = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);  
        if(!deletedNote) return res.status(404).send('Note not found');
        res.status(200).send(`Post, deleted successfully`);
    } catch (error) {
         console.error('Error in  deleteNote controller', error);
         res.status(500).json({message: 'Internal server error: cannot delete note'});
    }
};



export {getNotes, getNote, createNote, updateNote, deleteNote, }
