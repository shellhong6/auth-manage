var path = require('path');
var constant = require('../../utils/constant.js')

const router = require('koa-router')()

function encryption(str){
  return str.split('').map(function(item, index){
    return str.charCodeAt(index) + 50;
  }).join(',');
}

router.get(`${constant.paths.reviewOld}`, async (ctx, next) => {
  var password = constant.userInfos[ctx.query.q].password;
  await ctx.render('reviewOld', {
    title: 'auth-manage!',
    username: `${constant.userInfos[ctx.query.q].username}`,
    password: encryption(password)
  })
})

module.exports = router
