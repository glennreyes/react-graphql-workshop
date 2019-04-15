const { ApolloServer, gql } = require('apollo-server');
const {
  getAllMessages,
  getAllUsers,
  getMessagesFrom,
  getMessagesTo,
} = require('./db/models');

const typeDefs = gql`
  type Message {
    id: ID!
    message: String!
    from: User
    to: User
  }
  type User {
    id: ID!
    name: String!
    inbox: [Message!]!
  }
  type Query {
    users: [User!]!
    messages: [Message!]!
  }
`;

const resolvers = {
  Message: {
    from: obj => getMessagesFrom(obj.id),
    to: obj => getMessagesTo(obj.id),
  },
  Query: {
    messages: async () => getAllMessages(),
    users: () => getAllUsers(),
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log('Server started at', server.url));
