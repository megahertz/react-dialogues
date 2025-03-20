/* eslint-disable import/no-extraneous-dependencies */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      'react-dialogues': 'react-dialogues/src/index.ts',
    },
  },
  server: {
    port: 3010,
  },
});
