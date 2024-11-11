/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const noCss = process.argv.includes('--nocss');

export default defineConfig({
  plugins: [
    react(),
    !noCss && cssInjectedByJsPlugin({ injectCode }),
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

function injectCode(cssCode, { styleId, useStrictCSP, attributes }) {
  const elementStyleMods = Object.entries(attributes || {}).map(
    ([key, value]) => `elementStyle.setAttribute('${key}', '${value}');`,
  );

  if (typeof styleId === 'string' && styleId.length > 0) {
    elementStyleMods.push(`elementStyle.id = '${styleId}';`);
  }

  if (useStrictCSP) {
    elementStyleMods.push(
      'elementStyle.nonce = ' +
        'document.head.querySelector("meta[property=csp-nonce]")?.content;',
    );
  }

  return `
   try {
     if (typeof document !== 'undefined') {
       var elementStyle = document.createElement('style');
       ${elementStyleMods.join('\n')}
       elementStyle.appendChild(document.createTextNode(${cssCode}));
       document.head.prepend(elementStyle);
     }
   } catch (e) {
      console.error('vite-plugin-css-injected-by-js', e);
   }
`;
}
