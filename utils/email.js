var Emailjs = require('emailjs');
var _server = null;
const _getServer = function(){
  if(_server){
    return _server;
  }
  _server = Emailjs.server.connect({
     user:	"node_code",
     host:	"idcmail.meizu.com"
  });
  return _server;
}

module.exports = {
  send(attachment, to){
    var mes = Object.assign({},{
       text:	"前端授权",
       from:	"魅族小N <node_code@meizu.com>",
       subject:	"前端授权通知"
    }, {
      attachment,
      to
    });
    var server = _getServer();
    server.send(mes, function(err, message) {
      if(err){
        console.error(`send email error: ${to}, message: ${err.message}`);
        return;
      }
       console.log(`send email success: ${to}`);
    });
  }
}
