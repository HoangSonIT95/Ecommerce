import express from 'express';
import { verifyAdmin, verifyUser } from './../middlewares/verifyToken.js';
import {
  addProduct,
  deleteProduct,
  getDetailProduct,
  getProducts,
  pagination,
  EditProduct,
} from '../controller/products.js';
import fileUploader from '../configs/cloudinary.config.js';

const router = express.Router();

router.get('/pagination', pagination);
// GET Product
router.get('/', getProducts);
// Get Detail Product
router.get('/:productId', getDetailProduct);
// Edit Product
router.put('/:productId', fileUploader.array('image'), EditProduct);
// Add Product
router.post('/', fileUploader.array('image'), addProduct);
// Delete Product
router.delete('/:productId', deleteProduct);

export default router;

// module.exports = router;
