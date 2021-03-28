/* eslint-disable object-curly-newline */
import { v4 as uuid4 } from 'uuid';
import { validate as uuidValidator } from 'uuid';
import logger from '../utils/logger';
import * as c from '../utils/constants';
import User from '../models/User';

const UserService = function () {
  this.createNewUser = (name, email, password) => {
    logger.info('Try to create new user.', { name, email, password });
    if (!password || password.length < 4) throw new Error(c.PASSWORD_IS_TOO_SHORT);
    if (!name) throw new Error(c.NAME_IS_NOT_VALID);

    const uuid = uuid4();
    const newUser = { uuid, email, password, name };
    User.insert(newUser);

    logger.info(`[${uuid}] User successfully created.`);
    return User.getByUUID(uuid);
  };

  this.getUser = (uuid) => {
    logger.trace('Try to find user with uuid -', uuid);
    if (!uuid) throw new Error(c.BAD_UUID); // TODO: with uuid validator
    const user = User.getByUUID(uuid);
    if (!user) throw new Error(c.USER_NOT_FOUND);
    return user;
  };
};

const userService = new UserService();
export default userService;
