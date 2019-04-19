const { gql } = require('apollo-server');

const schema = gql`
  type Tweet {
    id: ID!
    createdAt: String!
    tweet: String!
    from: User!
  }
  type Mutation {
    createTweet(tweet: String!, from: String!): Tweet
    deleteTweet(id: ID!): Tweet
    createUser(
      username: String!
      bio: String
      displayName: String
      photo: String
    ): User
    updateUser(id: ID!, bio: String, displayName: String, photo: String): User
    deleteUser(id: ID!): User
  }
  type Query {
    me: User
    user(username: String!): User
    users: [User!]!
    tweet(id: ID!): Tweet
    tweets: [Tweet!]!
  }
  type User {
    id: ID!
    createdAt: String!
    username: String!
    displayName: String
    bio: String
    email: String
    photo: String
    tweets: [Tweet!]!
  }
`;

module.exports = schema;
