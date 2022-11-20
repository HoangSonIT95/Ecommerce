import express from 'express';
import { login, postLogout, register } from '../controller/auth.js';
import { validateLogin, validateSignup } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', validateSignup, register);
router.post('/login', validateLogin, login);
router.post('/logout', postLogout);

export default router;
