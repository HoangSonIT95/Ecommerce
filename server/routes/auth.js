import express from 'express';
import {
  login,
  postLogout,
  refreshToken,
  register,
} from '../controller/auth.js';
import { validateLogin, validateSignup } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', validateSignup, register);
router.post('/login', validateLogin, login);
router.post('/refreshToken', refreshToken);
router.post('/logout', postLogout);

export default router;
