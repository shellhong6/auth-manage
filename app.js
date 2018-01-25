const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

const index = require('./routes/index')
const reviewOld = require('./routes/reviewOld/index')
const reviewNew = require('./routes/reviewNew/index')
const zops = require('./routes/zops/index')
const manage = require('./routes/manage/index')
var constant = require('./utils/constant.js')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// app.use(async (ctx, next) => {
//   var path = ctx.path.substr(1);
//   if(constant.paths[path]){
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
//   }else{
//     await next()
//   }
// })

// auth
app.use(async (ctx, next) => {
  if(ctx.path.indexOf('honggj') != -1){
    await next();
    return;
  }
  var userInfo = constant.userInfos[ctx.query.q],
      path = ctx.path,
      isMustAuth = Object.keys(constant.paths).filter(function(key){
        return constant.paths[key] == path;
      }).length;
  if(isMustAuth){ //校验区间内
    if(!userInfo){
      ctx.body = '请先申请权限';
      return;
    }
    var hasAuth = userInfo.category.split(',').filter(function(item){
      return path.indexOf(item) != -1;
    }).length;
    if(hasAuth && userInfo.endTime > Date.now()){
      await next();
    }else{
      delete constant.userInfos[ctx.query.q];
      ctx.body = '授权已过期，请重新申请';
    }
  }else{
    await next();
  }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(reviewOld.routes(), reviewOld.allowedMethods())
app.use(reviewNew.routes(), reviewNew.allowedMethods())
app.use(zops.routes(), zops.allowedMethods())
app.use(manage.routes(), manage.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
