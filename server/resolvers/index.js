import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
import { GraphQLScalarType } from 'graphql'

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            return new Date(value)
        },

        serialize(value) {
            return value.toISOString()
        }
    }),
    // Query data, it will not change the data in database.
    Query: {
        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({
                updatedAt: 'desc',
            });
            // console.log({ folders, context });
            return folders;
        },

        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findById(folderId);
            return foundFolder;
        },

        note: async (parent, args) => {
            const noteId = args.noteId;
            const note = await NoteModel.findById(noteId);
            return note;
        },
    },

    Folder: {
        author: async (parent, args) => {
            console.log({ parent, args });
            const authorId = parent.authorId;
            const author = await AuthorModel.findOne({ uid: authorId });
            return author;
        },

        notes: async (parent, args) => {
            const notes = await NoteModel.find({
                folderId: parent.id,
            }).sort({
                updatedAt: 'desc'
            });
            console.log({ notes });
            return notes;
        },
    },

    Mutation: {
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({
                ...args,
                authorId: context.uid,
            });
            // console.log({ newFolder });
            pubsub.publish('FOLDER_CREATED')
            await newFolder.save();
            return newFolder;
        },

        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });

            // If do not found any user, create one.
            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            } else return foundUser; // If found, return that user
        },

        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();
            return newNote;
        },

        updateNote: async (parent, args) => {
            const noteId = args.id;
            const note = await NoteModel.findByIdAndUpdate(noteId, args);
            return note;
        }
    },

    Subscription: {
        folderCreated: {
            subscribe: () => {
                pubsub.asyncIterator(['FOLDER_CREATED']);
            }
        }
    }
};
