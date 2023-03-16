// https://esbuild.docschina.org/getting-started/

import * as esbuild from 'esbuild';
import { resolve } from '../common/utils';

esbuild
.build({
  entryPoints: [resolve('src/main.ts')],
  bundle: true,
  write: true,
  platform: 'node',
  format: 'esm',
  outdir: resolve('dist/esbuild')
})
.catch(() => process.exit(1));