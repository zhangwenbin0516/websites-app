import webpack, { Configuration } from "webpack"
import merge from "webpack-merge"
import koa from "koa"
import Router from "@koa/router"
import {resolve, configs} from "./webpack.config"

const args = process.argv.splice(2)
let prefix: string = 'local'
const argv = args.find(key => key.indexOf('mode=') > -1)
if (argv) {
  prefix = argv.substr(argv.indexOf("=")+1, argv.length) || 'local'
}
const options: Configuration = merge({
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules', '**/dist', '**/bin'],
    aggregateTimeout: 200,
  }
}, configs)

import(resolve(`${prefix}.config.ts`)).then(res => {
  const config = (res?.default || {}).config
  const app: koa = new koa({
    proxy: true
  })
  const router: Router = new Router()
  router.get('/', (ctx) => {
    ctx.body = "sadasd===="
  })
  app.use(router.routes())
  const serve = app.listen(config.port, config.host)
  serve.addListener('listening', function() {
    console.log(`访问服务地址:http://${config.host}:${config.port}`)
  })
  serve.addListener('error', function(error) {
    console.log(`服务启动失败:${error}`)
  })
})
