import { createServer } from 'node:http';
import type { User } from '@prisma/client';
import { createYoga } from 'graphql-yoga';
import { prisma } from './prisma';
import { schema } from './schema';

export interface Context {
  user: User;
}

const yoga = createYoga<Context>({
  context: async () => {
    // Auth logic implementation here
    // Mocking first user for now
    const user = await prisma.user.findFirstOrThrow();

    return { user };
  },
  schema,
});
const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
