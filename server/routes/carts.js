import express from 'express';
import {
  postCart,
  getCart,
  deleteCart,
  updateCart,
} from '../controller/carts.js';
const router = express.Router();

router.get('/', getCart);
router.post('/addCart', postCart);
router.delete('/deleteProductCart/:productId', deleteCart);
router.patch('/updateCart/', updateCart);

export default router;
