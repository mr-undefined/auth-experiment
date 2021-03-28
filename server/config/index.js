const _ = require('lodash');

const {
  PORT,
  NODE_ENV,
  LOGGER_LEVEL,
  TOKEN_TTL,
  CACHE_CHECK_PERIOD,
} = process.env;

if (!NODE_ENV) {
  const message = 'NODE_ENV is not set! Switching off the server';
  console.error(message);
  process.exit(1);
}

const all = {
  port: PORT,
  env: NODE_ENV,
  loggerLevel: LOGGER_LEVEL || 'info',
  TOKEN_TTL: TOKEN_TTL || 600,
  CACHE_CHECK_PERIOD: CACHE_CHECK_PERIOD || 60,
};

let result = all;
if (NODE_ENV === 'development') result = _.merge(all, require('./development.js') || {});
if (NODE_ENV === 'unit-test') result = _.merge(all, require('./unit-test.js') || {});

console.info(`Running with configuration: \n${JSON.stringify(result, null, 3)}`);

export default result;
