import express from 'express';
import { body } from 'express-validator';
import { register , login , getUserProfile , logout} from '../controller/user.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstname').notEmpty().withMessage('Fullname is required'),
    body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
], register);

router.post('/login' , [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
] , login)

router.get('/profile' ,authUser , getUserProfile)

router.get('/logout' , authUser , logout);  

export default router;