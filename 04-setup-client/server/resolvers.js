const { ApolloError } = require('apollo-server');
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweetsTo,
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
        const tweet = await createTweet(args.input);

        return { tweet };
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
    deleteTweet: async (_, args) => {
      try {
        const tweet = await deleteTweet(args.input);

        return { tweet };
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
    tweet: (_, args) => getTweetById(args.id),
    tweets: () => getAllTweets(),
    users: () => getAllUsers(),
    user: (_, args) => getUserById(args.id),
  },
  User: {
    tweets: obj => getTweetsTo(obj.id),
  },
};

module.exports = resolvers;
