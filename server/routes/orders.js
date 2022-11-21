import express from 'express';
import {
  createOrder,
  getOrdersUser,
  getOrder,
  getOrdersAll,
  getEarningTotal,
  getCountOrder,
  updateOrder,
  getEarningAvg,
} from '../controller/orders.js';
import { verifyAdmin, verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrdersUser);
router.get('/all', verifyAdmin, getOrdersAll);
router.get('/earningTotal', verifyAdmin, getEarningTotal);
router.get('/earningEvg', verifyAdmin, getEarningAvg);
router.get('/countOrder', verifyAdmin, getCountOrder);
router.get('/:orderId', verifyToken, getOrder);
router.put('/:orderId', verifyAdmin, updateOrder);

export default router;
