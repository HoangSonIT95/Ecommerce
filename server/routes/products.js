import express from 'express';
import {
  addProduct,
  deleteProduct,
  getDetailProduct,
  getProducts,
  pagination,
  EditProduct,
} from '../controller/products.js';
import fileUploader from '../configs/cloudinary.config.js';
import { verifyAdmin, verifyConselors } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/pagination', pagination);
// GET Product
router.get('/', getProducts);
// Get Detail Product
router.get('/:productId', getDetailProduct);
// Edit Product
router.put(
  '/:productId',
  verifyAdmin,
  fileUploader.array('image'),
  EditProduct
);
// Add Product
router.post('/', verifyAdmin, fileUploader.array('image'), addProduct);
// Delete Product
router.delete('/:productId', verifyAdmin, deleteProduct);

export default router;
