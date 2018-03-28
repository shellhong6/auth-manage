const Schedule = require('node-schedule');
var constant = require('../../utils/constant.js')
var emailUtil = require('../../utils/email.js')
var timeUtil = require('../../utils/time.js')
var request = require('request');
const router = require('koa-router')()

var userInfos = constant.userInfos;
var scheduleList = constant.scheduleList;

Schedule.scheduleJob(`0 0 0 * * *`, function(){
  var date = new Date();
  var curEndTime = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 23:59:59`).getTime();

  Object.keys(userInfos).forEach(function(key){
    if(userInfos[key].endTime < Date.now()){
      delete userInfos[key];
    }
  });
  scheduleList = scheduleList.filter(function(item){
    return !item.endTime || item.endTime > Date.now();
  });
  scheduleList.forEach(function(r){
    r.endTime = curEndTime;
    r.uid = getUid();
    if(r.email){
      var html = getHtml(r, r.uid);
      var emails = Object.keys(constant.safeEmails).filter(function(key){
        return constant.safeEmails[key] == r.email;
      });
      if(emails.length){
        emailUtil.send([{data: html, alternative:true}], r.email);
      }
    }else{
      sendDingding('review授权', r, r.uid);
    }
  });
});

function sendDingding(title, r, uid){
  console.log('begin sendDingding!');
  var body = {
    "msgtype": "markdown",
    "markdown": {
       "title": title,
       "text": getMarkdown(r, uid)
    },
    "at": {
      "atMobiles": [],
      "isAtAll": false
    }
  };
  request({
    method: 'POST',
    url: 'https://oapi.dingtalk.com/robot/send?access_token=5a902b71e4ab4e0b90587b95ce62e0a50f691fab6521b2da27c0cfc203c147af',
    headers: {
      'content-type':'application/json; charset=utf-8'
    },
    body: JSON.stringify(body),
    function(err, httpResponse, body) {
      if(err){
        console.error(`sendDingding fail:`, err);
        return;
      }
      console.log(`sendDingding success!`);
    }
  });
}

function getUid(){
  return 'x_' + parseInt(Math.random() * 1000) + Date.now();
}
function getHtml(r, uid){
  var html = r.category.split(',').map(function(item){
    return `<li style="margin-bottom:10px;">
              <a href='${constant.origins}${constant.paths[item]}?q=${uid}' target="_blank">${constant.origins}${constant.paths[item]}?q=${uid}</a>
            </li>`;
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
function getMarkdown(r, uid){
  var endTime = timeUtil.format(new Date(r.endTime), 'yyyy-MM-dd hh:mm:ss');
  var template = `### 授权链接如下\n* [review-new]({review-new})\n* [review-old]({review-old})\n* [zops]({zops}) \n\n> 截止至：{endTime}\n\n> 邮件内容不要告诉他人\n\n> 不可用于处理小组以外的其他项目`;

  return template.replace('{review-new}', `${constant.origins}${constant.paths['reviewNew']}?q=${uid}`)
                 .replace('{review-old}', `${constant.origins}${constant.paths['reviewOld']}?q=${uid}`)
                 .replace('{zops}', `${constant.origins}${constant.paths['zops']}?q=${uid}`)
                 .replace('{endTime}', endTime);
}

router.get('/front/auth/honggj', async (ctx, next) => {
  await ctx.render('manage.html')
})

router.get('/front/auth/honggj-schedule', async (ctx, next) => {
  await ctx.render('schedule.html')
})

router.get('/front/auth/honggj-clear', async (ctx, next) => {
  var query = ctx.query;
  delete userInfos[query.q];
  ctx.body = 'clear success';
})

router.get('/front/auth/honggj-schedule-clear', async (ctx, next) => {
  scheduleList = scheduleList.filter(function(item){
    return !item.username != query.q;
  });
})

router.get('/front/auth/honggj-emails', async (ctx, next) => {
  ctx.body = JSON.stringify({
    code: 200,
    value: constant.emails
  });
})
router.get('/front/auth/honggj-schedule-setting', async (ctx, next) => {
  var query = ctx.query;
  var r = {
    username: query.username,
    password: query.password,
    email: query.email,
    category: 'reviewOld,reviewNew,zops'
  };
  scheduleList.push(r);
  ctx.body = JSON.stringify({
    code: 200,
    value: '设置成功'
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
  var emails = Object.keys(constant.safeEmails).filter(function(key){
    return constant.safeEmails[key] == query.email;
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
