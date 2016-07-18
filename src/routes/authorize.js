import Router from 'koa-router';
import _ from 'lodash';
import { urlResolve, queryPatch } from '../utils/url';
import wechat, { isInWechat } from '../utils/wechat';

export const authorize = (ctx) => {
  const { state, scope } = ctx.query;
  const redirectUri = urlResolve(ctx.origin, `${ctx.path}/callback`);

  ctx.redirect(wechat.getAuthorizeURI({
    redirectUri,
    state,
    scope,
    notInWechat: !isInWechat(ctx.headers['user-agent']),
  }));
};

export const authorizeCallback = async(ctx) => {
  const { state, code } = ctx.query;

  await wechat.getUserInfo(code)
    .then((userInfo) => {
      ctx.redirect(
        queryPatch(_.isEmpty(state) ? ctx.origin : state, userInfo)
      );
    })
    .catch((error) => {
      ctx.log.error(error);
    });
};

const router = new Router;

router.get('/authorize', authorize);
router.get('/authorize/callback', authorizeCallback);

export default router;
