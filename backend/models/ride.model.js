import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status :{
    type: String,
    enum: ["pending", "accepted","ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
    //required: true,
  },
  distance: {
    type: Number,
    //required: true,
  },
  paymentId: {
    type: String,
    //required: true,
  },
  orderId : {
    type: String,
    //required: true,
  },
  signature : {
    type: String,
    //required: true,
  },
  otp :{
    type: String,
    select : false,
    //required: true,
  },
});

export const Ride = mongoose.model("Ride" , rideSchema);
