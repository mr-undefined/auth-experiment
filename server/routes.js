import { Router } from 'express';
import cors from 'cors';
import * as user from './controllers/user.controller';
import * as auth from './controllers/auth.controller';
import authWithToken from './middleware/authWithToken';

const router = new Router();
router.use(cors());

router.post('/signup', auth.signUpHandler);
router.post('/signin', auth.signInHandler);

router.get('/info', authWithToken, user.userInfo);
router.get('/logout', authWithToken, auth.signOutHandler);

export default router;
