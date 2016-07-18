import Router from 'koa-router';
import wechat from '../utils/wechat';

export const fetchConfig = async (ctx) => {
  const signatures = await wechat.getSignatures(ctx.query.url);

  console.log(signatures);

  Object.assign(ctx, {
    body: signatures,
  });
};

const router = new Router();

router.get('/sdk/config', fetchConfig);

export default router;
