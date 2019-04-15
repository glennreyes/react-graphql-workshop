const { ApolloServer, gql } = require('apollo-server');
const {
  getAllMessages,
  getAllUsers,
  getMessagesFrom,
  getMessagesTo,
  getMessageById,
  getUserById,
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
    user(id: ID!): User
    users: [User!]!
    message(id: ID!): Message
    messages: [Message!]!
  }
`;

const resolvers = {
  Message: {
    from: obj => getMessagesFrom(obj.id),
    to: obj => getMessagesTo(obj.id),
  },
  Query: {
    message: (_, args) => getMessageById(args.id),
    messages: () => getAllMessages(),
    users: () => getAllUsers(),
    user: (_, args) => getUserById(args.id),
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log(`Server started at ${server.url}`));
