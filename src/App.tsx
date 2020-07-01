import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { RestLink } from 'apollo-link-rest';

import Layout from './Layout';
import Home from './Home';

const token = `${process.env.GITHUB_TOKEN}`;

console.log({ token });

const authLink = setContext((_: any, { headers }: any) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${process.env.GITHUB_TOKEN}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const restLink = new RestLink({
  uri: 'https://kctbh9vrtdwd.statuspage.io/api/v2',
  headers: {
    mode: 'no-cors',
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([restLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Home />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
