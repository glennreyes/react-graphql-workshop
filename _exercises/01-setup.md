# 01 – Setup the GraphQL server

Open GraphQL playground under https://localhost:4000 to explore the API.

# Instructions

Create a simple server with a simple `hello` query which returns `"Hello World"` as a `String`.

Server (`index.js`):

```js
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    # TODO
  }
`;

const resolvers = {
  Query: {
    // TODO
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log(`Server started at ${server.url}`));
```

Verify in the GraphQL Playground (https://localhost:4000) if the query works as expected.
