import webpack, { Configuration } from "webpack"
import merge from "webpack-merge"
import koa from "koa"
import Router from '@koa/router'
import koaStatic from "koa-static"
import koaCompress from "koa-compress"
import {resolve, configs} from "./webpack.config"
import getRouter from './get.router'


const args = process.argv.splice(2)
let prefix: string = 'local'
const argv = args.find(key => key.indexOf('mode=') > -1)
if (argv) {
  prefix = argv.substr(argv.indexOf("=")+1, argv.length) || 'local'
}
const options: Configuration = merge({
  mode: "development",
  devtool: "inline-source-map",
  target: 'node',
  externalsPresets: {
    node: true
  },
  output: {
    path: resolve("..", "dist/server"),
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
            loader: 'css-loader'
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
            loader: 'css-loader'
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
        test: /\.(png|gif|jpg|jpeg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 0 * 1024,
          name: 'images/[name].[ext]'
        },
        exclude: resolve('..', 'node_modules')
      }
    ]
  },
  watch: true
}, configs)
webpack(options, function(err, opts: any) {
  if (!err) {
    import(resolve(`${prefix}.config.ts`)).then(res => {
      const config = (res?.default || {}).config
      const api = (res?.default || {}).api
      const optJSON = opts?.toJson({assets: true})
      const assets = optJSON.assets || []
      const etsJSON: any = []
      assets.filter((key: any) =>{
        if (!/\.html?$/.test(key.name)) {
          etsJSON.push(`/${key.name}`)
        }
      })
      const app: koa = new koa({
        proxy: true
      })
      app.use(koaCompress())
      app.use(koaStatic(resolve('..', 'dist/server'), {
        gzip: true
      }))
      const router = new Router()
      router.use('/', getRouter(etsJSON, api).routes())
      app.use(router.routes())
      const serve = app.listen(config.port, config.host)
      serve.addListener('listening', function() {
        console.log(`访问服务地址:http://${config.host}:${config.port}`)
      })
      serve.addListener('error', function(error) {
        console.log(`服务启动失败:${error}`)
      })
    })
  }
})
