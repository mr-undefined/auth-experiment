import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './utils/logger';
import router from './router';
import config from './config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
if (logger.isTraceEnabled()) app.use(morgan('tiny'));

app.use(router);

app.listen(config.port, () => {
  logger.info(`Server started at http://localhost:${config.port}`);
});
