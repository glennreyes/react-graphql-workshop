import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  config: {
    scalars: {
      DateTime: 'string',
    },
    strictScalars: true,
  },
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
};
export default config;
