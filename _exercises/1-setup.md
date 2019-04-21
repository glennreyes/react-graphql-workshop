# 1 – Setup the GraphQL server

Open GraphQL playground under https://localhost:4000 to explore the API.

# Task

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

Check with GraphQL Playground (https://localhost:4000) if you can query as expected.
