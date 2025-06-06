import { Ride } from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto';

export const getFare = async(pickup , distance)=>{

    if(!pickup || !distance){
        throw new Error("Pickup and distance are required");
    }
    const distanceTime = await getDistanceTime(pickup , distance);

    const baseFare = {
        auto : 30,
        car : 50,
        motorcycle : 20
    };

    const perKmRate = {
    auto : 10,
        car : 15,
        motorcycle : 5
    } 

    const perMinuteRate = {
        auto : 2,
        car : 3,
        motorcycle : 1
    }

    //console.log(distanceTime);

    const fare = {
        auto : baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto,
        car : baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car,
        motorcycle : baseFare.motorcycle + (distanceTime.distance.value / 1000) * perKmRate.motorcycle + (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
    }

    console.log(fare);

    return fare;

}

function getOTP(num){

    const otp = crypto.randomInt(100000 , 999999).toString();
    console.log(otp);
    return otp;

}

export const createRide = async({
    user , pickup , destination , vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All feilds are required    ")
    }

    const fare = await getFare(pickup , destination);

//     console.log(fare[vehicleType.toLowerCase()]
// );

    const ride = new Ride({
        user,
        pickup,
        destination,
        otp : getOTP(4),
        fare : fare[vehicleType.toLowerCase()],
    })

    

    return ride;
}

export const confirmRide = async(rideId , captainId) => {
    if(!rideId || !captainId){
        throw new Error("Ride ID and Captain ID are required");
    }


    await Ride.findOneAndUpdate({_id : rideId} , {status : "accepted" , captain : captainId} );


    const ride = await Ride.findById(rideId)
  .populate("user")
  .populate("captain").select("+otp");



    if(!ride){
        throw new Error("Ride not found");
    }

    return ride;
}

export const startRide = async(rideId , otp, captain) => {

    //console.log("Starting ride with ID:", rideId, "and OTP:", otp);
    //console.log("Captain:", captain);
    
    if(!rideId ){
        throw new Error("Ride ID,n are required");
    }

    if(!otp){
        throw new Error("OTP is required");

    }

    if(!captain || !captain._id){
        throw new Error("Captain is required");
    }

    const ride = await Ride.findOne({_id : rideId}).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not fount');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted')
    }

    if(ride.otp != otp){
        throw new Error('Invalid OTP')
    }

    await Ride.findOneAndUpdate({_id : rideId} , {
        status : 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId , {
        event: 'ride-started',
        data : ride
    })

    return ride;

}


export const endRide = async(rideId , captain) => {
    if(!rideId){
        throw new Error("Ride ID is required");
    }

    const ride = await Ride.findOne({_id : rideId , captain : captain._id}).populate('user').populate('captain').select('+otp');
    
    if(!ride){
        throw new Error("Ride not found");
    }
    if(ride.status !== 'ongoing'){
        throw new Error("Ride not ongoing");
    }

    await Ride.findOneAndUpdate({_id : rideId} , {
        status : 'completed'
    });

    return ride;
}