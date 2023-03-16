import { watch } from 'rollup';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { resolve } from '../common/utils';
import options from './rollup.config';

const watcher = watch({
  ...options.inputs,
  plugins: [
    livereload(),
    serve({
      open: true,
      port: 3500,
      openPage: '/',
      contentBase: resolve('dist/rollup')
    })
  ],
  output: {
    ...options.outs
  }
})

watcher.on('event', (event) => {
  console.log(event, 'sss')
})