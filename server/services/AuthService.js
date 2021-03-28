/* eslint-disable object-curly-newline,func-names */
import NodeCache from 'node-cache';
import crypto from 'crypto';
import logger from '../utils/logger';
import * as c from '../utils/constants';
import config from '../config';
import store from '../utils/store';
import User from '../models/User';
import userService from './UserService';

const { TOKEN_TTL, CACHE_CHECK_PERIOD } = config;

const AuthService = function (stdTTL, checkperiod) {
  const cache = new NodeCache({ stdTTL, checkperiod });

  this.createNewTokenFor = (uuid) => {
    const token = this.genNewToken();
    const result = cache.set(token, uuid);
    logger.trace(`[${uuid}] Token was successful created .`);
    if (result) return token;
    throw new Error('createNewTokenFor failed');
  };

  this.genNewToken = () => crypto.randomBytes(8).toString('hex');
  this.resetTokenTTL = (token) => cache.ttl(token, TOKEN_TTL);
  this.getUUIDByToken = (token) => cache.get(token);

  this.delAllByUUID = (uuid) => {
    const allTokens = cache.keys();
    for (const token of allTokens) {
      if (cache.get(token) === uuid) cache.del(token);
    }
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

  this.getAllKeys = () => {  // TODO: del it
    const keys = cache.keys();
    const result = [];
    keys.forEach((el) => {
      result.push({
        token: el,
        ttl: cache.getTtl(el),
        uuid: cache.get(el),
        left: Date.now() - cache.getTtl(el),
      });
    });

    return result;
  };

  this.authorize = (token, type) => {
    console.log('*****   *****    *****'); // TODO: del it
    console.log(this.getAllKeys());
    console.log(store.showAll());
    console.log('*****   *****    *****');

    logger.trace(`[${type}][${token}] Try to validate token...`);
    const uuid = this.getUUIDByToken(token);
    if (!uuid) throw new Error(c.WRONG_TOKEN);
    this.resetTokenTTL(token);
    return uuid;
  };
};

const authService = new AuthService(TOKEN_TTL, CACHE_CHECK_PERIOD);
export default authService;
