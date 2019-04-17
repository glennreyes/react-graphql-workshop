const { ApolloServer, ApolloError, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');

const typeDefs = importSchema('schema.graphql');
const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(server => console.log(`Server started at ${server.url}`));
