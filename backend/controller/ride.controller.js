import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getFare , confirmRide , startRide , endRide} from "../services/ride.service.js";
import {
  getAddressCoordinate,
  getCaptainsInTheRadius,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Captain } from "../models/captain.model.js";
import { Ride } from "../models/ride.model.js";
import { User } from "../models/user.model.js";

export const createRideController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    console.log("Received ride request from user:", req.user);

    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    await ride.save();

    // console.log("Ride created in DB:", ride);

    const pickupCords = await getAddressCoordinate(pickup);
    // console.log("Pickup coordinates:", pickupCords);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCords.ltd,
      pickupCords.lng,
      5000
    );
    console.log("Found captains:", captainsInRadius.length);

    
    

    ride.otp = "";

    
const rideWithUser = await Ride.findById(ride._id).populate("user");


    
    console.log(rideWithUser) 
    
    captainsInRadius.map((captain) => {
      if (!captain?.socketId) {
        console.warn("Captain missing socketId:", captain);
        return;
      }
;
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

  } catch (error) {
    console.error("Error creating ride:", error);

      return res.status(500).json({ message: "Internal Server Error" });
    
  }
};


export const getFareController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { pickup, destination } = req.query;

    //        console.log(pickup , destination);
    try {
      const fare = await getFare(pickup, destination);
      res.status(200).json(fare);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const confirmRideController = async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }


    const {rideId} = req.body;

    try {

        const ride = await confirmRide(rideId , req.captain._id);

        //console.log("Ride confirmed:", ride);

        sendMessageToSocketId(ride.user.socketId ,{
            event : "ride-confirmed",
            data : ride
        })
        return res.status(200).json(ride);
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({message : "Internal Server Error"});
        
    }
}


export const startRideController = async (req , res)=>{

  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error : error.array()});
  }

  const {rideId , otp} = req.query;

  try {

    const ride = await startRide(rideId , otp , req.captain)
    sendMessageToSocketId(ride.user.socketId , {
      event : "ride-started",
      data : ride
    });

    return res.status(200).json(ride);
    
  }
  catch (error) {

    return res.status(500).json({message : error.message});
    
  }

}

export const endRideController = async (req, res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error : error.array()});
  }

  const { rideId } = req.body;

  try {

    const ride = await endRide(rideId , req.captain);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
    
  } catch (error) {
    console.error("Error ending ride:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
}