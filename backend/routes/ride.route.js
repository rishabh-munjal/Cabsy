import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/create' , [
    body('userId').isString().withMessage('Invalid userID'),
    body('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup location'),
    body('destination').isString().isLength({min : 3}).withMessage('Invalid dropoff location'),
] , )


export default router;