import { build } from 'vite';
import { resolve } from '../common/utils';

build({
  mode: 'production',
  plugins: [
    
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