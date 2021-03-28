import logger from '../utils/logger';
import userService from '../services/UserService';

export const userInfo = (req, res) => {
  try {
    const user = userService.getUser(req.uuid);
    return res.status(200).json(user);
  } catch (err) {
    logger.error(`[${err.message}] userInfo is failed.  `);
    return res.status(400).json({ error: err.message });
  }
};
