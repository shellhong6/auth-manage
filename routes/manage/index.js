const Schedule = require('node-schedule');
var constant = require('../../utils/constant.js')
var emailUtil = require('../../utils/email.js')
var timeUtil = require('../../utils/time.js')
const router = require('koa-router')()

var userInfos = constant.userInfos;

Schedule.scheduleJob(`0 0 2 * * *`, function(){
  Object.keys(userInfos).forEach(function(key){
    if(userInfos[key].endTime < Date.now()){
      delete userInfos[key];
    }
  });
});

function getUid(){
  return 'x_' + parseInt(Math.random() * 1000) + Date.now();
}
function getHtml(r, uid){
  var html = r.category.split(',').map(function(item){
    return `<li style="margin-bottom:10px;">${constant.origins}${constant.paths[item]}?q=${uid}</li>`;
  }).join('');
  html = `
          <ul style='margin:0;padding:0;'>${html}</ul>
          <p style="margin-bottom:20px;color:#f551ef;">截止至：${timeUtil.format(new Date(r.endTime), 'yyyy-MM-dd hh:mm:ss')}</p>
          <ul style="color: #f10872;margin:0;padding:0;">
            <li style="margin-bottom:10px;">邮件内容不要告诉他人</li>
            <li>不可用于处理小组以外的其他项目</li>
          </ul>
         `;
  return html;
}

router.get('/front/auth/honggj', async (ctx, next) => {
  await ctx.render('manage.html')
})

router.get('/front/auth/honggj-clear', async (ctx, next) => {
  var query = ctx.query;
  delete userInfos[query.q];
  ctx.body = 'clear success';
})

router.get('/front/auth/honggj-emails', async (ctx, next) => {
  ctx.body = JSON.stringify({
    code: 200,
    value: constant.emails
  });
})

router.get('/front/auth/honggj-setting', async (ctx, next) => {
  var query = ctx.query,
      date1 = query.date1 + ' 23:59:59',
      uid = getUid();
  var r = {
    endTime: new Date(date1).getTime(),
    username: query.username,
    password: query.password,
    category: query.category,
    email: query.email
  };
  userInfos[uid] = r;
  var html = getHtml(r, uid);
  var emails = Object.keys(constant.emails).filter(function(key){
    return constant.emails[key] == query.email;
  });
  if(emails.length){
    emailUtil.send([{data: html, alternative:true}], query.email);
  }
  ctx.body = JSON.stringify({
    code: 200,
    value: html
  });
})

module.exports = router
