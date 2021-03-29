import { isString } from '../utils';
import authService from '../services/AuthService';
import logger from '../utils/logger';

const authWithToken = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString && !isString(tokenString)) throw new Error('TOKEN_NOT_FOUND');

    const token = tokenString.replace('Bearer ', '');

    req.uuid = authService.authorize(token);

    return next();
  } catch (err) {
    logger.error(`[${err.message}] authWithToken is failed.  `);
    return res.status(401).json({ error: err.message });
  }
};

export default authWithToken;
