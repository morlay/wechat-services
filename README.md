# Wechat Services

Just a koa demo for Wechat development

## Routes

* `/wechat/authorize?[state=redirectUri][&scope=snsapi_userinfo]` redirect to wechat oauth2 for getting code
* `/wechat/authorize/callback?code=CODE&state=[state=redirectUri]` receive code and redirect to state with openid (or userinfo when `scope='snsapi_userinfo'`)

* `/wechat/sdk/config?url=URL` URL=`${location.origin}${location.pathname}${location.search}`