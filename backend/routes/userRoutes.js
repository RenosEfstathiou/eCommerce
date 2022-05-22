import express from 'express';

// express route init
const router = express.Router();

// middleware
import { protect } from '../middleware/authMiddleware.js';

// Controllers
import {
  authUser,
  getUserProfile,
  getUserProfileByUserId,
  registerUser,
  updateUserProfile
} from '../controllers/userController.js';

// basic routing

//profile routes
router.route('/profile').get(protect, getUserProfile);
router.route('/profiles/:id').get(protect, getUserProfileByUserId);

// post requests
router.post('/login', authUser);
router.route('/register').post(registerUser);

// put routes
router.route('/profile').put(protect, updateUserProfile);
export default router;
