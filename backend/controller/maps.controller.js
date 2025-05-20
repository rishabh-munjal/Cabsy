import {getAddressCoordinate, getDistanceTime , getAutoCompleteSuggestions} from '../services/maps.service.js';
import { validationResult } from 'express-validator';


export const getCoordinates = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()});
    }
    const {address} = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json({
            coordinates: coordinates
        })
        
    } catch (error) {
        res.status(404).json({message : "Coordinates not found"});
        
    }
}

export const getDistanceTimeController = async(req , res)=>{

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors : errors.array()});
            
        }


        const {origin , destination} = req.query;
        const distancetime = await getDistanceTime(origin , destination);

        res.status(200).json(distancetime); 
        
    } catch (error) {
        res.status(500).json({message : "Internal server error"});
        
    }

}

export const getSuggestions = async(req , res) => {

    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {input} = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        return res.status(200).json(suggestions);
        
    } catch (error) {

        res.status(500).json({message : "Internal Server Error"});
        
    }

}