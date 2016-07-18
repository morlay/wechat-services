import { Request } from './Request';

export const getToken = ({
  appid,
  secret,
}) => Request.get('cgi-bin/token', {
  params: {
    appid,
    secret,
    grant_type: 'client_credential',
  },
});

export const getTicket = ({
  access_token,
}) => Request.get('cgi-bin/ticket/getticket', {
  params: {
    access_token,
    type: 'jsapi',
  },
});

