import Router from "@koa/router"
import streamRender from './server'
interface Api {
  host?: string
  port?: number
}
const router: Router = new Router()
const renderRouter = (etsJSON: string[], api: Api) => {
  router.get('/', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller/:page', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller/:page/:child', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller/:page/:child/:name', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller/:page/:child/:name/:id', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  router.get('/:entry/:controller/:page/:child/:name/:id/:hash', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  return router
}


export default renderRouter