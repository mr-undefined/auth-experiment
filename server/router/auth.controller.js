import authService from '../services/AuthService';
import logger from '../utils/logger';
import { isString } from '../utils';

export const signInHandler = (req, res) => {
  try {
    const user = authService.signIn(req.body);
    const token = authService.createNewTokenFor(user.uuid);
    return res.status(200).json({ token_type: 'bearer', access_token: token });
  } catch (err) {
    logger.error(`[${err.message}] signInHandler is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};

export const signOutHandler = (req, res) => {
  try {
    const { uuid } = req;
    authService.delAllByUUID(uuid);
    return res.status(200).send();
  } catch (err) {
    logger.error(`[${err.message}] signOutHandler is failed.  `);
    return res.status(502).json({ error: err.message });
  }
};

export const signUpHandler = async (req, res) => { // ok
  try {
    const user = authService.signUpUser(req.body);
    const token = authService.createNewTokenFor(user.uuid);
    return res.status(200).json({ token_type: 'bearer', access_token: token });
  } catch (err) {
    logger.error(`[${err.message}] signUpHandler is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Middleware for express router.
 */
export const withAuthMiddleware = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString && !isString(tokenString)) throw new Error('TOKEN_NOT_FOUND');
    const [type, token] = tokenString.split(' ');
    req.uuid = authService.authorize(token, type);

    return next();
  } catch (err) {
    logger.error(`[${err.message}] withAuthMiddleware is failed.  `);
    return res.status(402).json({ error: err.message });
  }
};
