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

builder.mutationField('deleteUser', (t) =>
  t.field({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (_, args) => prisma.user.delete({ where: { id: args.id } }),
    type: User,
  }),
);

builder.mutationField('createUser', (t) =>
  t.field({
    args: {
      bio: t.arg.string(),
      displayName: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      photo: t.arg.string(),
      username: t.arg.string({ required: true }),
    },
    resolve: (_, args) => prisma.user.create({ data: args }),
    type: User,
  }),
);

builder.mutationField('updateUser', (t) =>
  t.field({
    args: {
      bio: t.arg.string(),
      displayName: t.arg.string(),
      email: t.arg.string(),
      photo: t.arg.string(),
      username: t.arg.string(),
    },
    resolve: (_, args, ctx) =>
      prisma.user.update({
        data: {
          bio: args.bio,
          displayName: args.displayName,
          email: args.email ?? undefined,
          photo: args.photo,
          username: args.username ?? undefined,
        },
        where: { id: ctx.user.id },
      }),
    type: User,
  }),
);
