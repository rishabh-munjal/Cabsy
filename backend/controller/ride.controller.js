import {createRide} from '../services/ride.service.js'
import { validationResult } from 'express-validator';

export const createRideController = async(req , res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()})
    }

    const { userId , pickup , destination , vehicleType} = req.body;


    try {

        const ride = await createRide({user : req.user._id , pickup , destination , vehicleType});
        //console.log(ride);
        return res.status(201).json(ride);

        
        
    } catch (error) {
        res.status(400).json({message : "Internal Server Error"})
    }
}