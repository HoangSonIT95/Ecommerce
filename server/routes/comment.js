import express from 'express';
import { commentProduct, sendComment } from '../controller/comment.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:prodId', commentProduct);

router.post('/send/:prodId', verifyToken, sendComment);

export default router;
