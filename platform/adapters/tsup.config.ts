import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  external: [
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-s3',
    '@ddd/core',
    '@ddd/services',
  ],
  tsconfig: './tsconfig.json',
});
