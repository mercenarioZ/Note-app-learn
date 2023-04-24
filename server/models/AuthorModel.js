import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true
        },

        name: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel
