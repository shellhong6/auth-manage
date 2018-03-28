var path = require('path');
var constant = require('../../utils/constant.js')

const router = require('koa-router')()

function encryption(str){
  return str.split('').map(function(item, index){
    return str.charCodeAt(index) + 50;
  }).join(',');
}

router.get(`${constant.paths.reviewNew}`, async (ctx, next) => {
  var item = constant.userInfos[ctx.query.q], password, account;
  if(item){
    password = item.password;
    account = item.username;
  }else{
    var list = constant.scheduleList.filter(function(info){
      return info.uid == ctx.query.q;
    });
    if(list && list.length){
      password = list[0].password;
      account = list[0].username;
    }
  }
  if(password && account){
    await ctx.render('reviewNew', {
      title: 'auth-manage!',
      username: account,
      password: encryption(password)
    })
  }else{
    ctx.body = JSON.stringify({
      code: 200,
      value: '服务异常'
    });
  }
})

module.exports = router
