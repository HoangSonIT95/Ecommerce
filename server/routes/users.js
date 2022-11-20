import express from 'express';
import {
  deleteUser,
  getDetailUser,
  updateUser,
  getUsers,
  getCountUser,
} from '../controller/users.js';
import { verifyAdmin, verifyUser } from '../middlewares/verifyToken.js';

const router = express.Router();

// Get All User
router.get('/', verifyAdmin, getUsers);
// Get count user
router.get('/count', verifyAdmin, getCountUser);
// Get Detail User
router.get('/:userId', verifyUser, getDetailUser);
// Update
router.put('/:userId', verifyAdmin, updateUser);
// Delete User
router.delete('/:userId', verifyAdmin, deleteUser);

export default router;
