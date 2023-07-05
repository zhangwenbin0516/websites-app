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
  router.get('/:page', async (ctx, next) => {
    const response = await streamRender(ctx, etsJSON, api)
    ctx.body  = response
    await next()
  })
  return router
}


export default renderRouter