const noteModel = require("../models/note.model");

const createNote = async (req, res) => {
    
    const note = new noteModel( req.body );
    
    try {
        
        const noteSaved = await note.save();
        
        res.json({
            ok: true,
            note: noteSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact to the administrator'
        })
    }           

}

const getNotes = async ( req, res ) => {

    const notes = await noteModel.find();

    res.json({
        ok: true,
        notes
    })
}

const updateNote = async ( req, res ) => {
    
    const noteId = req.params.id;

    
    try {
        
        const note = await noteModel.findById( noteId );
        
        if(!note){
            return res.status(404).json({
                ok: false,
                msg: 'The note dont exist with that id.'
            });
        }

        const newNote = {
            ...req.body
        }

        //new: true es para que traiga el evento actualizado al momento en postman
        const noteUpdated = await noteModel.findByIdAndUpdate( noteId, newNote, { new: true } );

        res.json({
            ok: true,
            note: noteUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

const deleteNote = async ( req, res ) => {

    const noteId = req.params.id;

    try {

        const note = await noteModel.findById( noteId );

        if(!note){
            return res.status(404).json({
                ok: false,
                msg: 'The note dont exist with that id.'
            })
        }

        const noteDeleted = await noteModel.findByIdAndDelete( noteId );

        res.json({
            ok: true,
            msg: 'Note deleted',
            note: noteDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}