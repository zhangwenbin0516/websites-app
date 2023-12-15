import webpack, { Compiler, Configuration } from "webpack"
import merge from "webpack-merge"
import devServer from "webpack-dev-server"
import { resolve, configs, configEnv } from "./webpack.config"


const options: Configuration = merge(configs, {
  mode: "development",
  target: ["web", "es2017"],
  devtool: "inline-source-map",
  entry: {
    'react.app': resolve('..', 'src/entry/client.tsx'),
    'react.js': ["react", "react-dom"],
    'react.router': ["react-router-dom"]
  },
  output: {
    path: resolve("..", "dist/client"),
    filename: "js/[name].js",
    chunkFilename: "js/[id].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: '[name][local]-[hash:base64:5]',
                localIdentContext: resolve('..', 'src'),
                exportGlobals: true,
              },
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: resolve('..', 'node_modules')
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]' // 局部指定输出位置
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

const compiler: Compiler = webpack(options)
const params = configEnv()
import(resolve(`${params.mode || 'local'}.config.ts`)).then(async (res) => {
  const config = (res?.default || {})
  const serve = new devServer({
    host: config.host,
    port: config.port,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: true
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }, compiler)

  serve.startCallback((err) => {
    console.log(err, '错误日志')
    console.log('本地访问服务地址：', `http://${config.host}:${config.port}`)
  })
})
