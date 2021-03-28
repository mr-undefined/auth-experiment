import { Router } from 'express';
import cors from 'cors';
import * as user from './user.controller';
import * as auth from './auth.controller';
import { withAuthMiddleware as authorize } from './auth.controller';

const router = new Router();
router.use(cors());

router.post('/signup', auth.signUpHandler); // ok
router.post('/signin', auth.signInHandler);

router.get('/info', authorize, user.userInfo); // ok
router.get('/logout', authorize, auth.signOutHandler); // ok

export default router;
