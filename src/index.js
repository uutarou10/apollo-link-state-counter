import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient, InMemoryCache, gql } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers } from './resolvers'
import { ApolloProvider } from 'react-apollo';

const cache = new InMemoryCache();

const typeDefs = gql`
  type Counter {
    id: Int!
    count: Int!
  }

  type Mutation {
    addCounter(count: Int): Counter
    increment(amount: Int): Counter
    decrement(amount: Int): Counter
  }

  type Query {
    counters: [Counter]
  }
`

const stateLink = withClientState({
  resolvers,
  defaults,
  cache,
  typeDefs
});

const client = new ApolloClient({
  cache,
  link: stateLink
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.getElementById('root'));
registerServiceWorker();
