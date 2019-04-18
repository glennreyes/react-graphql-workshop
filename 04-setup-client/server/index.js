const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const util = require('util');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

    if (token) {
      const payload = await util.promisify(jwt.verify)(token, 'whateversecret');

      return { user: payload.user };
    }

    return null;
  },
});

server.listen().then(server => console.log(`Server started at ${server.url}`));
