const { ApolloServer, ApolloError, gql } = require('apollo-server');
const {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessagesFrom,
  getMessagesTo,
  getMessageById,
} = require('./db/messages');
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require('./db/users');

const typeDefs = gql`
  scalar DateTime
  input CreateMessageInput {
    from: ID!
    message: String!
    to: ID!
  }
  input DeleteMessageInput {
    id: ID!
  }
  type CreateMessagePayload {
    message: Message!
  }
  type DeleteMessagePayload {
    message: Message!
  }
  input CreateUserInput {
    name: String!
  }
  input DeleteUserInput {
    id: ID!
  }
  type CreateUserPayload {
    user: User!
  }
  type DeleteUserPayload {
    user: User!
  }
  type Message {
    id: ID!
    message: String!
    from: User!
    to: User!
  }
  type Mutation {
    createMessage(input: CreateMessageInput): CreateMessagePayload
    deleteMessage(input: DeleteMessageInput): DeleteMessagePayload
    createUser(input: CreateUserInput): CreateUserPayload
    deleteUser(input: DeleteUserInput): DeleteUserPayload
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
  Mutation: {
    createMessage: async (_, args) => {
      try {
        const message = await createMessage(args.input);

        return { message };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    createUser: async (_, args) => {
      try {
        const user = await createUser(args.input);

        return { user };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteMessage: async (_, args) => {
      try {
        const message = await deleteMessage(args.input);

        return { message };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const user = await deleteUser(args.input);

        return { user };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
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
