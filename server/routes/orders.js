import express from 'express';
import { verifyToken, verifyUser } from './../middlewares/verifyToken.js';
import {
  createOrder,
  getOrdersUser,
  getOrder,
  getOrdersAll,
  getEarningTotal,
  getCountOrder,
} from '../controller/orders.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrdersUser);
router.get('/all', getOrdersAll);
router.get('/earningTotal', getEarningTotal);
router.get('/countOrder', getCountOrder);
router.get('/:orderId', getOrder);

export default router;
// module.exports = router;
