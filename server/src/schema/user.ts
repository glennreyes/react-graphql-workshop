import { builder } from '../builder';

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

// TODO: 💎 Implement `me` query
// - Use the user from the context

// TODO: 💎 Implement `user` query
// - Use `prisma.user.findUnique` to get the user by username

// -- Optional --
// TODO: 💎 Implement `allUsers` query
// - Use `prisma.user.findMany` to get all users

// TODO: 💎 Implement `updateUser` mutation
// - Use `prisma.user.update` to update the user

// -- Optional --
// TODO: 💎 Implement `createUser` mutation
// TODO: 💎 Implement `deleteUser` mutation
