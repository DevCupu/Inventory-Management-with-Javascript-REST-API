// routes/productRoutes.js
import express from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

import upload from '../config/multerConfig.js'; // Import multer config

// CRUD routes
const router = express.Router();
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('gambar'), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
