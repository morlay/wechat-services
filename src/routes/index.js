import Router from 'koa-router';
import authorizeRouter from './authorize';
import sdkRouter from './sdk';

const router = new Router();

router.use('/wechat',
  authorizeRouter.routes(),
  authorizeRouter.allowedMethods(),
  sdkRouter.routes(),
  sdkRouter.allowedMethods()
);

export default router;
