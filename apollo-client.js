import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://palmeira.stepzen.net/api/solid-mole/__graphql',
  headers: {
    Authorization:`Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
},
  cache: new InMemoryCache(),
});

export default client;