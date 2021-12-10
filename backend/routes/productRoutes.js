import express from 'express';

// express route init
const router = express.Router();

// Controllers
import { getProducts, getProductById } from '../controllers/productController.js';

// basic routing
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
