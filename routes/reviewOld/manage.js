var request = require('request');
var constant = require('../../utils/constant.js')

module.exports = {
  async do(ctx) {
    var headers = await this.originRequest(ctx);
    var cookie = headers['set-cookie'],
        location = headers.location;
    ctx.redirect(location);
    ctx.response.set('set-cookie', cookie);
  },
  originRequest(ctx) {
    return new Promise(function(resolve, reject){
      request.post({
        url: 'http://review.rnd.meizu.com/internet/login/%23%2Fq%2Fstatus%3Aopen',
        form: {
          'username': constant.userInfos[ctx.query.q].username,
          'password': constant.userInfos[ctx.query.q].password
        }
      }, function(err, httpResponse, body) {
        if(err){
          console.error(err);
          reject(err);
          return;
        }
        resolve(httpResponse.headers);
      });
    });
  }
}
