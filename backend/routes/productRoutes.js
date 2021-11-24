import express from 'express';
import asyncHandler from 'express-async-handler';

// Shemas
import Product from '../models/productModel.js';

// express route init
const router = express.Router();

// basic routing

/**
 * @desc   Fetch all products
 * @route  /api/products
 * @access Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();

    return res.status(200).json(products);
  })
);

/**
 * @desc   Fetch product by poduct id
 * @route  /api/products/:id
 * @access Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  })
);
export default router;
