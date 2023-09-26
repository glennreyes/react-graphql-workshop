import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/generated/': {
      preset: 'client',
    },
  },
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  config: {
    scalars: {
      DateTime: 'string',
    },
    strictScalars: true,
  },
};
export default config;
