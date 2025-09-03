import { ApolloClient, InMemoryCache } from '@apollo/client';

const url = `http://localhost:3003`;
// const url = `http://14.224.146.235:3003`;

const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache({
        addTypename: false,
    }),
});

export default client;
