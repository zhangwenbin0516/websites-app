import path from 'path';

export const resolve = (filename: string) => {
  return path.resolve(__dirname, `../../${filename}`);
}