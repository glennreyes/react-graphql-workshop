const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: () => ({ user: '1' }),
});

server.listen().then(server => console.log(`Server started at ${server.url}`));
