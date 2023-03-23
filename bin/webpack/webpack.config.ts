// https://webpack.docschina.org/concepts/
import { Configuration } from "webpack";
import { resolve } from "../common/utils";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const options: Configuration = {
  target: 'web',
  entry: {
    app: resolve("src/main.tsx")
  },
  output: {
    filename: "js/[name].[contenthash:7].js",
    chunkFilename: "js/[name].[id].js",
    path: resolve("dist/webpack"),
    // libraryTarget: 'system'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".json"],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve('src'),
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/react'
              ],
              plugins: [
                '@babel/plugin-transform-runtime'
              ]
            }
          },
          {
            loader: 'source-map-loader'
          }
        ],
        exclude: resolve('node_modules')
      },
      {
        test: /\.tsx?$/,
        include: resolve('src'),
        use: {
          loader: 'ts-loader',
          options: {
            configFile: resolve('tsconfig.json')
          }
        },
        exclude: resolve('node_modules')
      },
      {
        test: /\.css$/,
        include: resolve('src'),
        use: ["style-loader", "css-loader"],
        exclude: resolve('node_modules')
      },
      {
        test: /\.(sa|sc)ss$/,
        include: resolve('src'),
        use: [
          {
            loader: "css-loader"
          },
          {
            loader: "scss-loader"
          }
        ],
        exclude: resolve('node_modules')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "single-spa",
      template: resolve("static/webpack.html"),
      filename: "index.html",
      inject: false
    })
  ]
}

export default options