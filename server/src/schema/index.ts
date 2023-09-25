import { builder } from '../builder';

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name ?? 'World'}`,
    }),
  }),
});

export const schema = builder.toSchema();
