import { Router } from 'express';
import cors from 'cors';
import * as user from './user.controller';
import * as auth from './auth.controller';

const router = new Router();
router.use(cors());

router.get('/info', user.userInfo);
router.get('/logout', auth.signOutHandler);
router.post('/signin', auth.signInHandler);
router.post('/signup', auth.signUpHandler);

export default router;
