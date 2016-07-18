import config from 'config';
import WechatAuth from '../modules/WechatAuth';

export const isInWechat =
  (userAgent) => (/micromessenger/i).test(String(userAgent).toLowerCase());

export default new WechatAuth({
  appId: config.WECHAT.APP_ID,
  appSecret: config.WECHAT.APP_SECRET,
});
