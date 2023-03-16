import { createServer } from 'vite';
import { resolve } from '../common/utils';
import { createHtmlPlugin } from 'vite-plugin-html';

createServer({
  configFile: false,
  mode: 'development',
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
        assetFileNames: 'css/[name].[hash:7].[ext]'
      }
    }
  },
  plugins: [
    createHtmlPlugin({
      pages: [
        {
          template: resolve('static/vite.html'),
          filename: 'index.html'
        }
      ]
    })
  ],
  server: {
    host: 'localhost',
    port: 3100,
    open: true
  }
}).then((res) => {
  console.log(res)
  res.listen();
})
