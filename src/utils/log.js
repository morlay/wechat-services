import config from 'config';
import bunyan from 'bunyan';

export default bunyan.createLogger({
  name: 'wechat-services',
  stream: process.stdout,
  level: config.LOG_LEVEL || 'info',
});
