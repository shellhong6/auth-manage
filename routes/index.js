const router = require('koa-router')()

router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: 'auth-manage!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'auth-manage string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'auth-manage json'
  }
})

module.exports = router
