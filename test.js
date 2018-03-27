var request = require('request');


function sendDingding(title){
  console.log('begin sendDingding!');
 //  var body = {
 //     "msgtype": "markdown",
 //     "markdown": {
 //         "title":"杭州天气",
 //         "text": "#### 杭州天气 @156xxxx8827\n" +
 //                 "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
 //                 "> ![screenshot](http://image.jpg)\n"  +
 //                 "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n"
 //     },
 //    "at": {
 //        "atMobiles": [
 //            "156xxxx8827",
 //            "189xxxx8325"
 //        ],
 //        "isAtAll": false
 //    }
 // };
  var body = {
    "msgtype": "markdown",
    "markdown": {
       "title": title,
       "text": getMarkdown()
    },
    "at": {
      "atMobiles": [],
      "isAtAll": false
    }
  };
  console.log('body--', body);
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
function getMarkdown(){
  var template = `### 授权链接如下\n* [review-new]({review-new})\n* [review-old]({review-old})\n* [zops]({zops}) \n\n> 截止至：{endTime}\n\n> 邮件内容不要告诉他人\n\n> 不可用于处理小组以外的其他项目`;
  return template.replace('{review-new}', 'http://www.baidu.com')
                 .replace('{review-old}', 'http://www.baidu.com')
                 .replace('{zops}', 'http://www.baidu.com')
                 .replace('{endTime}', 4);
}

sendDingding('标题');
