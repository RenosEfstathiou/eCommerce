import express from 'express';

// express route init
const router = express.Router();

// middleware
import { protect } from '../middleware/authMiddleware.js';

// Controllers
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';

// basic routing

// get requests
router.route('/profile').get(protect, getUserProfile);

// post requests
router.post('/login', authUser);
router.route('/register').post(registerUser);
export default router;
