import authService from '../services/AuthService';
import logger from '../utils/logger';

export const userInfo = (req, res) => {
  try {
    const { uuid } = req.query;
    const user = authService.getUser(uuid);
    return res.status(200).json(user);
  } catch (err) {
    logger.error(`[${err.message}] userInfo is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};
