import { isString } from '../utils';
import authService from '../services/AuthService';
import logger from '../utils/logger';

const authWithToken = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString && !isString(tokenString)) throw new Error('TOKEN_NOT_FOUND');

    const token = tokenString.replace('Bearer ', '');

    req.uuid = authService.authorize(token);

    return next();
  } catch (err) {
    logger.error(`[${err.message}] withAuthMiddleware is failed.  `);
    return res.status(402).json({ error: err.message });
  }
};

export default authWithToken;