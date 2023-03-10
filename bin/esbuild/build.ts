// https://esbuild.docschina.org/getting-started/

import * as esbuild from 'esbuild';
import path from 'path';

esbuild
.build({
  entryPoints: [path.resolve(__dirname, '../../src/main.ts')],
  bundle: true,
  write: true,
  platform: 'node',
  format: 'esm',
  outdir: path.resolve(__dirname, '../../dist/esbuild')
})
.catch(() => process.exit(1));