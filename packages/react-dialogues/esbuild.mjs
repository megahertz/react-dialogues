#!/usr/bin/env node

import { style as inlineCssPlugin } from "@hyrious/esbuild-plugin-style";
import { generateDtsBundle } from 'dts-bundle-generator';
import esbuild from 'esbuild';
import fs from 'node:fs';

// const withTypes = !process.argv.includes('--no-types');

const esBuildConfig = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  external: ['react', 'react-dom'],
  format: 'esm',
  outfile: './dist/index.mjs',
  plugins: [inlineCssPlugin()],
  sourcemap: true,
};

// ESM
await esbuild.build(esBuildConfig);

// ESM nostyle
await esbuild.build({
  ...esBuildConfig,
  outfile: './dist/index.nostyle.mjs',
  plugins: [noCssPlugin()],
});

// CJS
await esbuild.build({
  ...esBuildConfig,
  format: 'cjs',
  outfile: './dist/index.cjs',
});

// CJS nostyle
await esbuild.build({
  ...esBuildConfig,
  outfile: './dist/index.nostyle.cjs',
  format: 'cjs',
  plugins: [noCssPlugin()],
});

// Separate CSS
await esbuild.build({
  ...esBuildConfig,
  entryPoints: ['src/styles.css'],
  outfile: './dist/styles.css',
  plugins: [],
});



// if (withTypes) {
//   const [dtsBundle] = generateDtsBundle([{ filePath: 'src/index.ts',allowedTypesLibraries: [] }]);
//   await fs.promises.writeFile('dist/index.d.ts', dtsBundle);
// }

function noCssPlugin() {
  return {
    name: 'no-css',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, () => ({ contents: '' }));
    },
  };
}
