import { getWechatRedirectUri } from './Request';

export const connectOnWeb = ({
  appid,
  redirect_uri,
  scope,
  state,
}) => getWechatRedirectUri('/connect/qrconnect', {
  appid,
  redirect_uri,
  response_type: 'code',
  scope: scope || 'snsapi_login',
  state: state || '',
});

export const connectInWechat = ({
  appid,
  redirect_uri,
  scope,
  state,
}) => getWechatRedirectUri('/connect/oauth2/authorize', {
  appid,
  redirect_uri,
  response_type: 'code',
  scope: scope || 'snsapi_base',
  state: state || '',
});
