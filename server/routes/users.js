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
router.get('/', getUsers);
// Get count user
router.get('/count', getCountUser);
// Get Detail User
router.get('/:userId', getDetailUser);
// Update
router.put('/:userId', updateUser);
// Delete User
router.delete('/:userId', deleteUser);

export default router;
