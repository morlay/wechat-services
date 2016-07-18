import Koa from 'koa';
import convert from 'koa-convert';

import bunyanLogger from 'koa-bunyan-logger';
import staticServe from 'koa-static';
import bodyParser from 'koa-bodyparser';

import log from './utils/log';
import router from './routes';

const app = new Koa();

app.use(convert(bodyParser()));

app.use(convert(bunyanLogger(log)));
// app.use(convert(bunyanLogger.requestLogger()));

app.use(convert(staticServe(`${process.cwd()}/public`)));

app.use(router.routes());

export default app;
