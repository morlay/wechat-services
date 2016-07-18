import axios from 'axios';
import qs from 'qs';

export const getWechatRedirectUri = (url, query) =>
  `https://open.weixin.qq.com${url}?${qs.stringify(query)}#wechat_redirect`;

export const Request = axios.create({
  baseURL: 'https://api.weixin.qq.com',
  timeout: 5000,
});
