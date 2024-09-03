/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const noCss = process.argv.includes('--nocss');

export default defineConfig({
  plugins: [
    react(),
    !noCss && cssInjectedByJsPlugin(),
    dts({ logLevel: 'silent', rollupTypes: true }),
  ],
  build: {
    lib: { entry: 'src/index.ts' },
    cssMinify: true,
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: [
        {
          entryFileNames: noCss ? '[name].nocss.mjs' : '[name].mjs',
          format: 'esm',
        },
        {
          entryFileNames: noCss ? '[name].nocss.cjs' : '[name].cjs',
          format: 'cjs',
        },
      ],
    },
    sourcemap: true,
  },
});
