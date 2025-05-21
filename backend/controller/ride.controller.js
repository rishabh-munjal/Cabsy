import {createRide} from '../services/ride.service.js'
import { validationResult } from 'express-validator';
import { getFare } from '../services/ride.service.js';

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

export const getFareController = async(req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()});
    }else{
        const {pickup , destination} = req.query;

//        console.log(pickup , destination);
        try {
            const fare = await getFare(pickup , destination);
            res.status(200).json(fare);
        } catch (error) {
            res.status(500).json({message : "Internal server error"});
        }
    }
}