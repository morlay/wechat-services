import _ from 'lodash';
import sha1 from 'crypto-js/sha1';

export const createNonceStr = () =>
  Math.random().toString(36).substr(2, 15);

export const createTimestamp = () =>
  String(Math.floor(new Date().getTime() / 1000));

const getRaw = (object) => _.toPairs(object)
  .map((pair) => [pair[0].toLowerCase(), pair[1]].join('='))
  .join('&');

const getSignature = ({
  ticket,
  nonceStr,
  timestamp,
  url,
}) => {
  const raw = getRaw({
    jsapi_ticket: ticket,
    nonceStr,
    timestamp,
    url,
  });

  return {
    nonceStr,
    timestamp,
    signature: sha1(raw).toString(),
  };
};

export default getSignature;
