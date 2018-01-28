var path = require('path');
var constant = require('../../utils/constant.js')

const router = require('koa-router')()

function encryption(str){
  return str.split('').map(function(item, index){
    return str.charCodeAt(index) + 50;
  }).join(',');
}

router.get(`${constant.paths.zops}`, async (ctx, next) => {
  var password = constant.userInfos[ctx.query.q].password;
  await ctx.render('zops', {
    title: 'auth-manage!',
    account: `${constant.userInfos[ctx.query.q].username}@meizu.com`,
    password: encryption(password)
  })
})

module.exports = router
