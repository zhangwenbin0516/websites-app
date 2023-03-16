// https://www.rollupjs.com/
import { InputOptions ,OutputOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
const { uglify } = require('rollup-plugin-uglify');
import { resolve } from '../common/utils';

interface IProps{
  inputs: InputOptions
  outs: OutputOptions
}

const options: IProps = {
  inputs: {
    input: resolve('src/main.ts'),
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      uglify()
    ]
  },
  outs: {
    dir: resolve('dist/rollup'),
    format: 'es'
  }
};

export default options;