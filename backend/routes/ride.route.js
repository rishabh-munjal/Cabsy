import express from 'express';
import { body , query} from 'express-validator';
import { createRideController , getFareController } from '../controller/ride.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create' , [
    authUser,
    body('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup location'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid dropoff location'),
    body('vehicleType').isString().isIn(['Auto' , 'Car' , 'Motorcycle']).withMessage("Invalid Vehicle type")
] , createRideController )

router.get('/get-fare',[authUser , 
    query('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({min : 3}).withMessage('Invalid dropoff location'),
], getFareController)


export default router;