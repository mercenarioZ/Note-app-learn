import { graphQLRequest } from './request';

export const foldersLoader = async () => {
    const query = `query Folders {
        folders {
            id
            name
        }
    }
    `;

    const data = await graphQLRequest({ query }); // Take in 2 args: options and payload
    return data;
};

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
        addFolder(name: $name) {
            name
            author {
                name
            }
        }
    }`;

    const data = await graphQLRequest({
        query,
        variables: {
            name: newFolder.name,
        },
    });

    return data;
};
