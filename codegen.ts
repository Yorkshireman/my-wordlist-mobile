import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['src/**/*.{ts,tsx,js,jsx}'],
  generates: {
    './src/__generated__/': {
      plugins: [],
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  schema: [
    {
      'http://localhost:3000/graphql': {
        headers: {
          Authorization: '<auth token>'
        }
      }
    }
  ]
};

export default config;
