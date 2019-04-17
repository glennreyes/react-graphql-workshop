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
  deleteUser,
  getAllUsers,
  getUserById,
} = require('./db/users');

const resolvers = {
  Tweet: {
    from: obj => getUserById(obj.from),
  },
  Mutation: {
    createTweet: async (_, args) => {
      try {
        return createTweet(args);
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
    deleteTweet: async (_, args) => {
      try {
        return deleteTweet(args);
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
    tweet: (_, args) => getTweetById(args.id),
    tweets: () => getAllTweets(),
    users: () => getAllUsers(),
    user: (_, args) => getUserById(args.id),
  },
  User: {
    email: (obj, args, context) => (context.user === obj.id ? obj.email : null),
    tweets: obj => getTweetsFrom(obj.id),
  },
};

module.exports = resolvers;
