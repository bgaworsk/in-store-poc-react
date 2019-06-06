import React from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from './lib/headless-client';

const App = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default App;