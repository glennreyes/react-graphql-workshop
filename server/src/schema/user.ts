import { builder } from '../builder';
import { prisma } from '../prisma';

export const User = builder.prismaObject('User', {
  fields: (t) => ({
    bio: t.exposeString('bio', { nullable: true }),
    displayName: t.exposeString('displayName', { nullable: true }),
    email: t.exposeString('email'),
    id: t.exposeID('id'),
    photo: t.exposeString('photo', { nullable: true }),
    posts: t.relation('posts', {
      query: () => ({
        orderBy: {
          createdAt: 'desc',
        },
      }),
    }),
    username: t.exposeString('username'),
  }),
});

builder.queryField('me', (t) =>
  t.field({
    resolve: (_, __, ctx) => ctx.user,
    type: User,
  }),
);

builder.queryField('allUsers', (t) =>
  t.field({
    resolve: () => prisma.user.findMany(),
    type: [User],
  }),
);

builder.queryField('user', (t) =>
  t.field({
    args: {
      username: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (_, args) =>
      prisma.user.findUnique({
        where: { username: args.username },
      }),
    type: User,
  }),
);

// TODO: 💎 Implement `updateUser` mutation
// - Use `prisma.user.update` to update the user

// -- Optional --
// TODO: 💎 Implement `createUser` mutation
// TODO: 💎 Implement `deleteUser` mutation
