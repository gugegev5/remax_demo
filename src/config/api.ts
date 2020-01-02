let ApiRootUrl = 'https://marathon-coop.qiecdn.com/api/';
let NewApiRootUrl = 'https://api.qiecdn.com/cmsapi/off_roading_h5/';
let SensorUrl = "https://sclog.qiecdn.com/sa?project=production"
// let envVersion = __wxConfig.envVersion;
// // if (envVersion === 'trial') {
// //   ApiRootUrl = 'https://running.demo.ruoshuo.com/api/';
// // }
// let env = wx.getSystemInfoSync();
// if (env.platform === 'devtools' || envVersion === 'develop') {
//   // ApiRootUrl = 'http://marathon-qualifying.zhaocong.php7.developer.qi-e.tv/api/';
//   // NewApiRootUrl = 'http://www.dev.qi-e.tv/cmsapi/off_roading_h5/';
//   SensorUrl = "https://sclog.qiecdn.com/sa?project=default"
// }

export default {
  AuthLoginByWeixin: ApiRootUrl + 'social.login', //微信登录
  OrderList: ApiRootUrl + 'order.list', //获取订单列表
  OrderItemDetail: ApiRootUrl + 'order.item.detail', //获取订单详情
  OrderItemDetailByRunner: ApiRootUrl + 'order.item.runner.detail', //获取订单详情
  RunnerDetail: ApiRootUrl + 'player.detail', //获取runner详情
  SaveFeedBack: ApiRootUrl + 'feedback.submit', //意见反馈
  EventList: ApiRootUrl + 'event.list', //赛事列表
  EventDetail: ApiRootUrl + 'event.detail', //赛事详情
  PlayerList: ApiRootUrl + 'player.list', //运动员列表
  PlayerUpdate: ApiRootUrl + 'player.update', //更新运动员信息
  PlayerDetail: ApiRootUrl + 'player.detail', //更新运动员信息
  PlayerDelete: ApiRootUrl + 'player.delete', //删除运动员
  OrderSubmit: ApiRootUrl + 'order.submit', //下单
  OrderCancel: ApiRootUrl + 'order.cancel', //取消订单
  SmsCode: ApiRootUrl + 'sms.verification.code', //短信验证码
  SmsCheckCode: ApiRootUrl + 'sms.check.code', //短信验证码
  PaymentTo: ApiRootUrl + 'payment.pay', //支付发起
  PaymentQuery: ApiRootUrl + 'payment.query', //支付查询
  ConfigValue: ApiRootUrl + 'config.value', //系统配置
  ScoreFilterList: ApiRootUrl + 'score.filter.list', //成绩查询
  ScoreQuery: ApiRootUrl + 'score.query', //成绩查询
  RegionList: ApiRootUrl + 'player.region.list', //地域列表
  VideoQuery: ApiRootUrl + 'video.query', //视频查询
  MatchList: NewApiRootUrl + 'match_list',//ai视频 查询赛事列表
  MatchPlayer: NewApiRootUrl + 'match_player',//查询选手ai视频
  SensorUrl,//神策埋点服务器地址
};