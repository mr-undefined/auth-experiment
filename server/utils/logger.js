import log4js from 'log4js';
import config from '../config';

log4js.configure({
  appenders: { 'test-app': { type: 'console' } },
  categories: { default: { appenders: ['test-app'], level: config.loggerLevel } },
});

const logger = log4js.getLogger('test-app');
export default logger;
