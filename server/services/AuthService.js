/* eslint-disable object-curly-newline,func-names */
// import { v4 as uuid4 } from 'uuid';
import User from '../models/User';
import logger from '../utils/logger';
import * as c from '../utils/constants';

const AuthService = function () {
  this.createUser = (user) => {
    logger.info('Try to create user with next data : ', user);
    if (!user) throw new Error(c.DATA_IS_INVALID);
    const { email, password, name } = user;
    if (!email) throw new Error(c.EMAIL_IS_NOT_VALID);
    if (User.getByEmail(email)) throw new Error(c.USER_ALREADY_CREATED);
    if (!password || password.length < 4) throw new Error(c.PASSWORD_IS_TOO_SHORT);
    if (!name) throw new Error(c.NAME_IS_NOT_VALID);

    // const uuid = uuid4(); // TODO: Uncomment before deploy.
    const uuid = '7ff7c131-0e76-4d50-bd1c-54027d3f2e5f';
    const newUser = { uuid, email, password, name };
    User.insert(newUser);

    logger.info(`[${uuid}] User successfully created.`);
    return User.getByUUID(uuid);
  };

  this.getUser = (uuid) => {
    logger.trace('Try to find user with uuid -', uuid);
    if (!uuid) throw new Error(c.BAD_UUID);
    const user = User.getByUUID(uuid);
    if (!user) throw new Error(c.USER_NOT_FOUND);
    return user;
  };
};

const authService = new AuthService();
export default authService;
