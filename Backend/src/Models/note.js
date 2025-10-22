import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
    type: mongoose.Schema.Types.String,
    required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps: true}
);

    export const Note = mongoose.model('Note', NoteSchema);
