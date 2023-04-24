import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },

        folderId: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel
