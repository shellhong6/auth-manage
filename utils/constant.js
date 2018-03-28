const EMAILS = {
  "邝利军": "kuanglijun@meizu.com",
  "杨俊雄": "yangjunxiong@meizu.com",
  "徐伟雄": "xuweixiong@meizu.com",
  "陈晓滨": "chenxiaobin@meizu.com",
  "李书畑": "lishutian1@meizu.com",
  "洪广杰": "guangjie@meizu.com"
};

module.exports = {
  emails: EMAILS,
  safeEmails: Object.assign({
    "洪广杰1": "13543089551@139.com"
  }, EMAILS),
  userInfos : {},
  scheduleList: [],
  paths: {
    reviewNew: '/front/auth/reviewNew',
    reviewOld: '/front/auth/reviewOld',
    zops: '/front/auth/zops'
  },
  origins: 'http://appff.meizu.com'
}
