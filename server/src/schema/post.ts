import { builder } from '../builder';
import { prisma } from '../prisma';

const Post = builder.prismaObject('Post', {
  fields: (t) => ({
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    id: t.exposeID('id'),
    message: t.exposeString('message'),
    user: t.relation('user'),
  }),
});

builder.queryField('allPosts', (t) =>
  t.field({
    resolve: () => prisma.post.findMany({ orderBy: { createdAt: 'desc' } }),
    type: [Post],
  }),
);

// TODO: 💎 Implement `createPost` mutation
// - Use `prisma.post.create` to create the post

// TODO: 💎 Implement `deletePost` mutation
// - Use `prisma.post.delete` to delete the post
