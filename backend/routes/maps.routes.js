import express from 'express';
import {authUser , authCaptain} from '../middleware/auth.middleware.js';
import { getCoordinates , getDistanceTimeController , getSuggestions} from '../controller/maps.controller.js';

import { query } from 'express-validator';


const router = express.Router();


router.get('/get-coordinates' , [query('address').isString().isLength({min : 3})], authUser , getCoordinates);

router.get('/get-distance-time' ,  
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min:3}),
    authUser,
    getDistanceTimeController
 )

router.get('/get-suggestions' ,
    query('input').isString(),
    authUser,
    getSuggestions
)


export default router;