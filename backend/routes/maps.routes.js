import express from 'express';
import {authUser , authCaptain} from '../middleware/auth.middleware.js';
import { getCoordinates , getDistanceTimeController , getSuggestions} from '../controller/maps.controller.js';

import { query } from 'express-validator';


const router = express.Router();


router.get('/get-coordinates' ,authUser , [query('address').isString().isLength({min : 3})],  getCoordinates);

router.get('/get-distance-time' ,  
    authUser,
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min:3}),
    getDistanceTimeController
 )

router.get(
  '/get-suggestions',
  authUser, // first
  query('input').isString(), // second
  getSuggestions // finally
);



export default router;