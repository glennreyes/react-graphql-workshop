const { gql } = require('apollo-server');

const schema = gql`
  type Tweet {
    id: ID!
    createdAt: String!
    tweet: String!
    from: User!
  }
  type Mutation {
    createTweet(tweet: String!, from: ID!): Tweet
    deleteTweet(id: ID!): Tweet
    createUser(username: String!, displayName: String): User
    deleteUser(id: ID!): User
  }
  type Query {
    user(id: ID!): User
    users: [User!]!
    tweet(id: ID!): Tweet
    tweets: [Tweet!]!
  }
  type User {
    id: ID!
    createdAt: String!
    username: String!
    displayName: String
    email: String
    tweets: [Tweet!]!
  }
`;

module.exports = schema;
