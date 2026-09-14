import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    resolve: false,
  },
  external: [
    '@ddd/core',
    '@ddd/services',
    '@ddd/adapters',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/credential-providers',
    '@aws-sdk/types',
  ],
});
