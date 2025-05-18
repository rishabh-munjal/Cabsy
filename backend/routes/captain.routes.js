import express from 'express';
import { body } from 'express-validator';
import { Captain } from '../models/captain.model.js';
import { authCaptain} from '../middleware/auth.middleware.js';
import { registerCaptain , loginCaptain , getcaptainProfile, logoutCaptain} from '../controller/captain.controller.js';

const router = express.Router();

router.post('/register' ,[
     body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.type').isIn([ 'Car', 'Motorcycle', 'Auto' ]).withMessage('Invalid vehicle type')
], registerCaptain);


router.post('/login' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
] , loginCaptain)

router.get('/profile' , authCaptain , getcaptainProfile);

router.get('/logout' , authCaptain , logoutCaptain)


export default router;