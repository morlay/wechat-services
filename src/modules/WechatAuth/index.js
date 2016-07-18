import moment from 'moment';
import * as connectApis from '../WechatApis/connect';
import * as oauth2Apis from '../WechatApis/oauth2';
import * as tokenApis from '../WechatApis/token';

import getSignatures, { createNonceStr, createTimestamp } from '../WechatSign';
import createDB from '../DB';

class WechatAuth {
  constructor({ appId, appSecret }) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.db = createDB(appId);
  }

  setToken({ token, expiresAt }) {
    this.db.set('token', {
      value: token,
      expiresAt,
    }).value();
  }

  setTicket({ ticket, expiresAt }) {
    this.db.set('ticket', {
      value: ticket,
      expiresAt,
    }).value();
  }

  getToken() {
    const now = moment();
    const tokenObject = this.db.get('token').value();

    if (now.isBefore(moment(tokenObject.expiresAt))) {
      return Promise.resolve(tokenObject.value);
    }

    return tokenApis.getToken({
      appid: this.appId,
      secret: this.appSecret,
    })
      .then((res) => {
        const { access_token, expires_in } = res.data;

        this.setToken({
          token: access_token,
          expiresAt: now.add(expires_in, 's'),
        });

        return res.data.access_token;
      });
  }

  getTicket() {
    const now = moment();
    const ticketObject = this.db.get('ticket').value() || {};

    if (now.isBefore(moment(ticketObject.expiresAt))) {
      return Promise.resolve(ticketObject.value);
    }

    return this.getToken()
      .then((accessToken) => tokenApis.getTicket({
        access_token: accessToken,
      }))
      .then((res) => {
        const { ticket, expires_in } = res.data;

        this.setTicket({
          ticket,
          expiresAt: now.add(expires_in, 's'),
        });

        return ticket;
      });
  }

  getSignatures(url) {
    return this.getTicket()
      .then((ticket) => ({
        ...getSignatures({
          ticket,
          url,
          nonceStr: createNonceStr(),
          timestamp: createTimestamp(),
        }),
        appId: this.appId,
      }));
  }

  getAuthorizeURI({ redirectUri, state, scope, notInWechat }) {
    if (notInWechat) {
      return connectApis.connectOnWeb({
        appid: this.appId,
        redirect_uri: redirectUri,
        scope,
        state,
      });
    }

    return connectApis.connectInWechat({
      appid: this.appId,
      redirect_uri: redirectUri,
      scope,
      state,
    });
  }

  getUserInfo(code) {
    return oauth2Apis.getAccessToken({
      appid: this.appId,
      secret: this.appSecret,
      code,
    })
      .then((res) => {
        if (res.data.errcode) {
          throw res.data;
        }
        if (res.data.scope === 'snsapi_userinfo') {
          return oauth2Apis.getUserInfo(res.data).then(({ data }) => data);
        }
        return {
          openid: res.data.openid,
        };
      });
  }
}

export default WechatAuth;
