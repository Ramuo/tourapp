import express from 'express';
import {
    loginUser,
    registerUser,
    getUserProfile,
    updateProfile
} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js';



const router = express.Router();



router.route('/register').post(registerUser)
router.route('/login').post(loginUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateProfile);


 



export default router;