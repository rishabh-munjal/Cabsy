import { Ride } from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service";

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

    const fare = {
        auto : baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto,
        car : baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car,
        motorcycle : baseFare.motorcycle + (distanceTime.distance.value / 1000) * perKmRate.motorcycle + (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
    }

    return fare;

}

export const createRide = async({
    user , pickup , destination , vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All feilds are required    ")
    }
}