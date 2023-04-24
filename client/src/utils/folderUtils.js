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
