const proxy = require('koa2-proxies')
var constant = require('../../utils/constant.js')

const origin = constant.origins.reviewOld;

module.exports = {
  init(app) {
    app.use(async function(ctx, next) {
      if(ctx.origin != origin){
        await next();
        return;
      }
      if (new RegExp(`${constant.paths.reviewOld}\\/*$`).test(ctx.path)) {
        await next();
      } else {
        await proxy({
          host: origin,
          ctx
        });
      }
    })
  }
}
