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

builder.mutationField('createPost', (t) =>
  t.field({
    args: {
      message: t.arg.string({ required: true }),
    },
    resolve: (_, args, ctx) => {
      return prisma.post.create({
        data: {
          message: args.message,
          userId: ctx.user.id,
        },
      });
    },
    type: Post,
  }),
);

builder.mutationField('deletePost', (t) =>
  t.field({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (parent, args, ctx) => {
      const post = await prisma.post.findUniqueOrThrow({ where: { id: args.id } });

      if (ctx.user.id !== post.userId) {
        throw new Error('You are not authorized to delete this post');
      }

      return prisma.post.delete({ where: { id: args.id } });
    },
    type: Post,
  }),
);
