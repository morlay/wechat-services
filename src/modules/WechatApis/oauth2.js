import { Request } from './Request';

export const getAccessToken = ({
  appid,
  secret,
  code,
}) => Request.get('/sns/oauth2/access_token', {
  params: {
    appid,
    secret,
    code,
    grant_type: 'authorization_code',
  },
});

export const getUserInfo = ({
  access_token,
  openid,
  lang,
}) => Request.get('/sns/userinfo', {
  params: {
    access_token,
    openid,
    lang: lang || 'zh_CN',
  },
});
