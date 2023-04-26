import { graphQLRequest } from './request';

export const notesLoader = async ({ params: { folderId } }) => { // Params are the content on the URL 
    const query = `query Folder($folderId: String!) {
        folder(folderId: $folderId) {
            id
            name
            notes {
                id
                content
                updatedAt
            }
        }
    }`;

    const data = await graphQLRequest({
        query,
        variables: {
            folderId,
        },
    });
    return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
    const query = `query Note($noteId: String!) {
        note(noteId: $noteId) {
          content
          id
        }
      }`;

    const data = await graphQLRequest({ query, variables: { noteId } });
    return data;
};

export const addNewNote = async ({params, request}) => {
    const newNote = await request.formData()
    
    // Convert form data into normal object
    const formDataObject = {}
    newNote.forEach((value, key) => (formDataObject[key] = value))
    // console.log({newNote, formDataObject})
    const query = `mutation Mutation($content: String!, $folderId: ID!) {
        addNote(content: $content, folderId: $folderId) {
            content
            id
        }
    }`

    const {addNote} = await graphQLRequest({
        query,
        variables: formDataObject
    })

    console.log({addNote})
    return addNote;
}

export const updateNote = async ({params, request}) => {
    const updatedNote = await request.formData()
    const formDataObject = {}
    updatedNote.forEach((value, key) => formDataObject[key] = value)
    const query = `mutation Mutation($content: String!, $id: String!) {
        updateNote(content: $content, id: $id) {
            id
            content
        }
    }`

    const {updateNote} = await graphQLRequest({
        query,
        variables: formDataObject
    })

    return updateNote
}
