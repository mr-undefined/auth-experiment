import authService from '../services/AuthService';
import logger from '../utils/logger';

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
    authService.flushTokensForUUID(uuid);
    return res.status(200).send();
  } catch (err) {
    logger.error(`[${err.message}] signOutHandler is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};

export const signUpHandler = (req, res) => {
  try {
    const user = authService.signUpUser(req.body);
    const token = authService.createNewTokenFor(user.uuid);
    return res.status(200).json({ token_type: 'bearer', access_token: token });
  } catch (err) {
    logger.error(`[${err.message}] signUpHandler is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};
