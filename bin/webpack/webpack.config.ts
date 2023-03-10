// https://webpack.docschina.org/concepts/
import { Configuration } from "webpack";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const options: Configuration = {
  entry: {
    app: path.resolve(__dirname, "../../src/main.ts")
  },
  output: {
    filename: "js/[name].[contenthash:7].js",
    chunkFilename: "js/[name].[id].js",
    path: path.resolve(__dirname, "../../dist/webpack")
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
      template: path.resolve(__dirname, "../../static/index.html"),
      filename: "index.html"
    })
  ]
}

export default options