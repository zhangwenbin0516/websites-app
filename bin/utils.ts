import path from 'path'

export const resolve = (...args: string[]) => {
  // 将传入的参数与当前文件所在的文件夹路径拼接成一个完整的路径
  return path.resolve(...[__dirname, ...args])
}
