import Koa, { Context } from 'koa'
import Router from '@koa/router'
import fs from 'fs'
import koaStatic from 'koa-static'
import koaCompress from 'koa-compress'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from '../src/entry/main'
import register from '@babel/register'
import { StaticRouter } from 'react-router-dom/server'
import { resolve } from './webpack.config'
import { Writable } from 'stream'
import { Next } from 'koa'

register({
    presets: ['@babel/env', '@babel/react', '@babel/typescript'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
})


const app = new Koa({
    proxy: true
})
const router = new Router()
const argv = process.argv.slice(2)
let prefix: string = 'local'
if (argv.join('&').indexOf('mode=') > -1) {
    argv.find((value, index) => {
        prefix = argv[index].replace('mode=', '')
        return value.indexOf('mode=') > -1
    })
}
import(resolve(`${prefix}.config.ts`)).then(async (res) => {
    const config = (res?.default || {})
    app.use(koaCompress())
    app.use(koaStatic(config.publicJS.replace('/js', ''), {
        gzip: true
    }))
    const assets: string[] = []
    fs.readdir(config.publicJS, (err, data) => {
        if (!err) {
            data.filter(file => {
                if (/^react\./.test(file) && /.js$/.test(file)) {
                    assets.push(`/js/${file}`)
                }
            })
        }
    })
    const html = fs.readFileSync(resolve(__dirname, '..', 'static/index.html'))
    async function cb(ctx: Context) {
        return await new Promise(async (resolve) => {
            const { pipe, abort } = renderToPipeableStream(<StaticRouter location={'/'}>
                <App />
            </StaticRouter>, {
                onShellReady() {
                    const [before, after] = html.toString('utf-8').split('<!-- ssr:app -->')
                    const stream = new Writable({
                        write(chunk, _encoding, cb) {
                            ctx.res.write(chunk, cb)
                        },
                        final() {
                            res.end(after)
                        }
                    })
                    ctx.respond = false
                    ctx.res.statusCode = 200
                    ctx.response.set('Content-Type', 'text/html')
                    res.write(before)
                    pipe(stream)
                    resolve(ctx.res)
                },
                onShellError(err) {
                    ctx.res.statusCode = 500
                    ctx.res.statusMessage = "服务错误"
                    abort()
                },
                onError() {
                    ctx.res.statusCode = 404
                    ctx.res.statusMessage = "未找到资源"
                    abort()
                }
            })
            setTimeout(() => abort(), 5000)
        })
    }
    async function render(ctx: Context, next: Next) {
        const response = await cb(ctx)
        ctx.body = response
        await next()
    }
    router.get("/", render)
    router.get("/:root", render)
    router.get("/:root/:page", render)
    router.get("/:root/:page/:childPage", render)
    router.get("/:root/:page/:childPage/:detail/", render)
    router.get("/:root/:page/:childPage/:detail/:name", render)
    router.get("/:root/:page/:childPage/:detail/:name/:value", render)
    router.get("/:root/:page/:childPage/:detail/:name/:value/:id", render)
    router.get("/:root/:page/:childPage/:detail/:name/:value/:id/:hash", render)

    app.use(router.routes())
    app.use(router.allowedMethods())
    const serve = app.listen(config.port, config.host)
    serve.addListener('listening', function () {
        console.log(`访问服务地址:http://${config.host}:${config.port}`)
    })
    serve.addListener('error', function (err) {
        console.log(`服务启动失败:${err}`)
    })
})