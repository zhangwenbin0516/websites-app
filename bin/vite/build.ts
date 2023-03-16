import { build } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from '../common/utils';

build({
  mode: 'production',
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          template: resolve('static/vite.html'),
          filename: '/index.html',
          entry: resolve('src/main.ts')
        }
      ]
    })
  ],
  build: {
    lib: {
      entry: resolve('src/main.ts'),
      formats: ['iife'],
      name: 'main'
    },
    outDir: resolve('dist/vite'),
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash:7].js',
        chunkFileNames: 'js/[name].[hash:7].js',
        assetFileNames: 'js/[name].[hash:7].[ext]'
      }
    }
  }
}).then((res) => {
  console.log(res)
})