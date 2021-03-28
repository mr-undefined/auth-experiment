import NodeCache from 'node-cache';
import crypto from 'crypto';
import config from '../config';

const { TOKEN_TTL, CACHE_CHECK_PERIOD } = config;

const cache = new NodeCache({ stdTTL: TOKEN_TTL, checkperiod: CACHE_CHECK_PERIOD });

const Token = {};

Token.genNewToken = () => crypto.randomBytes(8).toString('hex');

Token.updateTTL = (token, ttl) => cache.ttl(token, ttl);

Token.getUUIDByToken = (token) => cache.get(token);

Token.write = (token, uuid) => cache.set(token, uuid);

Token.getAll = () => cache.keys();

Token.del = (token) => cache.del(token);

export default Token;
