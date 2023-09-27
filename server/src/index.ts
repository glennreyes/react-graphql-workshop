import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

const yoga = createYoga({
  schema: createSchema({
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
      },
    },
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
  }),
});
const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
