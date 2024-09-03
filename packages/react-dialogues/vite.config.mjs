import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({ rollupTypes: true })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs', 'umd']
    },
    minify: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: [
        { entryFileNames: '[name].mjs',  format: 'esm' },
        { entryFileNames: '[name].cjs',  format: 'cjs' },
        { entryFileNames: '[name].umd.js',  format: 'umd', name: 'ReactDialogues', },
      ]
    },
    sourcemap: true,
  }
})
