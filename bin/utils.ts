import path from "path";

export const resolve = (...args: string[]) => {
  return path.resolve(...[__dirname, ...args]);
}