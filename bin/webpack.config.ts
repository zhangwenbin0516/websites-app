import {Configuration} from "webpack"
import webpackBar from "webpackbar"
import compressionWebpackPlugin from "compression-webpack-plugin"
import eslintWebpackPlugin from "eslint-webpack-plugin"
import path from "path"

export const resolve = (...dirs: string[]) => {
  return path.resolve(...[__dirname, ...dirs])
}

export const configs: Configuration = {
  mode: "development",
  entry: {
    main: resolve("..", "src/main.tsx"),
    reactJS: ["react", "react-dom"],
    router: ["react-router-dom"]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json'],
    mainFiles: ["index"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: resolve('..', 'tsconfig.json')
            }
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader',
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  plugins: [
    new webpackBar(),
    new compressionWebpackPlugin(),
    new eslintWebpackPlugin({
      fix: true,
      context: resolve('..', 'src'),
      cache: true,
      cacheLocation: resolve('..', 'cache/eslint')
    })
  ],
  stats: {
    errorDetails: true
  }
}