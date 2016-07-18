import { expect } from '@morlay/test-utils';
import config from 'config';
import WechatAuth from '../index';

describe(__filename, () => {
  const wechat = new WechatAuth({
    appId: config.WECHAT.APP_ID,
    appSecret: config.WECHAT.APP_SECRET,
  });

  it('getToken', () => wechat.getToken().then(
    (token) => wechat.getToken().then(
      token2 => expect(token).to.eql(token2)
    )));
  it('getTicket', () => wechat.getTicket().then(
    (ticket) => wechat.getTicket().then(
      ticket2 => expect(ticket).to.eql(ticket2)
    )));
});
