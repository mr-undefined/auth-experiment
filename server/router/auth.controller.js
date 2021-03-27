import authService from '../services/AuthService';
import logger from '../utils/logger';

export const signInHandler = (req, res) => {
  const toSend = { status: 'ok' };
  return res.status(200).json(toSend);
};

export const signOutHandler = (req, res) => {
  const toSend = { status: 'ok' };
  return res.status(200).json(toSend);
};

export const signUpHandler = async (req, res) => { // ok
  try {
    const result = await authService.createUser(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`[${err.message}] signUpHandler is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};
