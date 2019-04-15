const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hei! 👋',
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log(`Server started at ${server.url}`));
