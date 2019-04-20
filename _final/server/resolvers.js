const { ApolloError } = require('apollo-server');
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweetsFrom,
  getTweetById,
} = require('./db/tweets');
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserByUsername,
} = require('./db/users');

const resolvers = {
  Tweet: {
    from: obj => getUserByUsername(obj.from),
  },
  Mutation: {
    createTweet: async (_, args) => {
      try {
        return createTweet(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteTweet: async (_, args) => {
      try {
        return deleteTweet(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    createUser: async (_, args) => {
      try {
        return createUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateUser: async (_, args) => {
      try {
        return updateUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        return deleteUser(args);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Query: {
    me: (_, args, context) => getUserByUsername(context.user),
    tweet: (_, args) => getTweetById(args.id),
    tweets: () => getAllTweets(),
    users: () => getAllUsers(),
    user: (_, args) => getUserByUsername(args.username),
  },
  User: {
    email: (obj, args, context) =>
      context.user === obj.username ? obj.email : null,
    tweets: obj => getTweetsFrom(obj.username),
  },
};

module.exports = resolvers;
