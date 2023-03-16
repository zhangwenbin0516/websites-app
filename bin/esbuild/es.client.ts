// https://esbuild.docschina.org/getting-started/

import * as esbuild from 'esbuild';
import { resolve } from '../common/utils';

esbuild
.serve({
  port: 3000,
  host: 'localhost'
}, {
  entryPoints: [resolve('src/main.ts')],
  bundle: true,
  write: true,
  platform: 'node',
  format: 'esm',
  outdir: resolve('dist/esbuild')
})
.then((server) => {
  console.log("服务地址:", `http://${server.host}:${server.port}`)
})
.catch((serve) => {
  serve.stop();
  process.exit(1);
});