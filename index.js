const koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')

const app = new koa()
const router = new Router()

async function getRes(fn, ctx) {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 1000)
  })
}

// 注册 mock 路由
mockList.forEach(item => {
  const { url, method, response } = item
  router[method](url, async ctx => {
    const res = await getRes(response, ctx)
    ctx.body = res
  })
})

app.use(router.routes())
app.listen(3001)
