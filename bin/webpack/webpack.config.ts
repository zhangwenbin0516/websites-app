// https://webpack.docschina.org/concepts/
import { Configuration } from "webpack";
import { resolve } from "../common/utils";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const options: Configuration = {
  entry: {
    app: resolve("src/main.ts")
  },
  output: {
    filename: "js/[name].[contenthash:7].js",
    chunkFilename: "js/[name].[id].js",
    path: resolve("dist/webpack")
  },
  resolve: {
    // extensions: [".ts", ".tsx", ".css", ".scss", ".json"],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: []
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: "css-loader"
          },
          {
            loader: "scss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "single-spa",
      template: resolve("static/webpack.html"),
      filename: "index.html"
    })
  ]
}

export default options