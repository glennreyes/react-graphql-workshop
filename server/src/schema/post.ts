import { builder } from '../builder';

export const Post = builder.prismaObject('Post', {
  fields: (t) => ({
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    id: t.exposeID('id'),
    message: t.exposeString('message'),
    user: t.relation('user'),
  }),
});

// TODO: 💎 Implement `allPosts` query
// - Use `prisma.post.findMany` to get all posts

// TODO: 💎 Implement `createPost` mutation
// - Use `prisma.post.create` to create the post

// TODO: 💎 Implement `deletePost` mutation
// - Use `prisma.post.delete` to delete the post
