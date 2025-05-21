import { Ride } from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto';

async function getFare(pickup , distance){

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

function getOTP(num) {
    // Ensure num is 4 for 4-digit OTP
    const min = Math.pow(10, num - 1); // 1000 for 4 digits
    const max = Math.pow(10, num) - 1; // 9999 for 4 digits
    const otp = crypto.randomInt(min, max + 1).toString();
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