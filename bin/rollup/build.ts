import rollup from 'rollup';
import options from './rollup.config';

const setup = async () => {
  const inputOptions = await rollup.rollup(options.inputs);
  // const configs = await inputOptions.generate(options.outs);
  inputOptions.write(options.outs);
}

setup();