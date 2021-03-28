/* eslint-disable object-curly-newline,func-names */
import logger from '../utils/logger';
import * as c from '../utils/constants';
import config from '../config';
import User from '../models/User';
import Token from '../models/Token';
import userService from './UserService';

const { TOKEN_TTL } = config;

const AuthService = function () {
  this.createNewTokenFor = (uuid) => {
    const token = Token.genNewToken();
    const result = Token.write(token, uuid);
    logger.trace(`[${uuid}] Token was successful created .`);
    if (result) return token;
    throw new Error('createNewTokenFor failed');
  };

  this.flushTokensForUUID = (uuid) => {
    const allTokens = Token.getAll();
    allTokens.forEach((token) => {
      if (Token.getUUIDByToken(token) === uuid) Token.del(token);
    });
  };

  this.signIn = (body) => {
    logger.info('Try to signin user.');
    if (!body) throw new Error(c.DATA_IS_INVALID);
    const { email, password } = body;
    console.log(body);
    if (!email) throw new Error(c.EMAIL_IS_NOT_VALID);
    if (!password) throw new Error(c.PASSWORD_IS_TOO_SHORT);

    const user = User.getByEmail(email);
    if (!user) throw new Error(c.USER_NOT_FOUND);
    if (password === user.password) return user;
    throw new Error(c.WRONG_PASSWORD);
  };

  this.signUpUser = (user) => {
    logger.info('Try to signup user.');
    if (!user) throw new Error(c.DATA_IS_INVALID);
    const { email, password, name } = user;
    if (!email) throw new Error(c.EMAIL_IS_NOT_VALID);

    const availableUser = User.getByEmail(email);
    if (!availableUser) return userService.createNewUser(name, email, password);

    return availableUser;
  };

  this.authorize = (token) => {
    logger.trace(`[${token}] Try to validate token...`);
    const uuid = Token.getUUIDByToken(token);
    if (!uuid) throw new Error(c.WRONG_TOKEN);
    Token.updateTTL(token, TOKEN_TTL);
    return uuid;
  };
};

const authService = new AuthService();
export default authService;
