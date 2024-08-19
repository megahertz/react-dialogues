#!/usr/bin/env node

import { generateDtsBundle } from 'dts-bundle-generator';
import esbuild from 'esbuild';
import * as fs from 'node:fs';

// const withTypes = !process.argv.includes('--no-types');

await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  external: ['react', 'react-dom'],
  format: 'esm',
  outdir: './dist',
  sourcemap: true,
});

// if (withTypes) {
//   const [dtsBundle] = generateDtsBundle([{ filePath: 'src/index.ts' }]);
//   await fs.promises.writeFile('dist/index.d.ts', dtsBundle);
// }
