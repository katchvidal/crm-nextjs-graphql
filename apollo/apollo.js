import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
    // uri: 'http://localhost:8000/graphql'
    uri: 'https://server-graphql-2022.vercel.app/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers : {
            ...headers,
            Authorization: token ? token : ''
        }
    }
})
const client = new ApolloClient({

    cache: new InMemoryCache(),
    link: authLink.concat( httpLink ),
    connectToDevTools: true
});


export default client;