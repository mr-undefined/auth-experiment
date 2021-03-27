const _ = require('lodash');

const {
  DEMO_SERVICE_PORT,
  NODE_ENV,
  LOGGER_LEVEL,
} = process.env;

if (!NODE_ENV) {
  const message = 'NODE_ENV is not set! Switching off the server';
  console.error(message);
  process.exit(1);
}

const all = {
  port: DEMO_SERVICE_PORT,
  env: NODE_ENV,
  loggerLevel: LOGGER_LEVEL,
};

let result = all;
if (NODE_ENV === 'development') {
  result = _.merge(all, require('./development.js') || {});
}

console.info(`Running with configuration: \n${JSON.stringify(result, null, 3)}`);

export default result;
