var path = require('path');
var manage = require('./manage');
var constant = require('../../utils/constant.js')

const router = require('koa-router')()

router.get(`/${constant.paths.reviewOld}`, async (ctx, next) => {
  await manage.do(ctx);
})

module.exports = router
