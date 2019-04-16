const { ApolloServer, gql } = require('apollo-server');
const {
  getAllMessages,
  getMessagesFrom,
  getMessagesTo,
  getMessageById,
} = require('./db/messages');
const { getAllUsers, getUserById } = require('./db/users');

const typeDefs = gql`
  type Message {
    id: ID!
    message: String!
    from: User
    to: User
  }
  type Query {
    user(id: ID!): User
    users: [User!]!
    message(id: ID!): Message
    messages: [Message!]!
  }
  type User {
    id: ID!
    name: String!
    inbox: [Message!]!
  }
`;

const resolvers = {
  Message: {
    from: obj => getUserById(obj.from),
    to: obj => getUserById(obj.to),
  },
  Query: {
    message: (_, args) => getMessageById(args.id),
    messages: () => getAllMessages(),
    users: () => getAllUsers(),
    user: (_, args) => getUserById(args.id),
  },
  User: {
    inbox: obj => getMessagesTo(obj.id),
  },
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log(`Server started at ${server.url}`));
