#!/usr/bin/env node

import config from 'config';
import log from '../utils/log';
import server from '../server';

server.listen(config.PORT, () => {
  log.info(`listening on port ${config.PORT} with appId ${config.WECHAT.APP_ID}`);
});
