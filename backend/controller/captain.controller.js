import { Captain } from "../models/captain.model.js";
import { BlacklistToken } from "../models/blacklistTokes.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCaptain = new Captain({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        type: vehicle.type,
      },
    });

    await newCaptain.save();

    const token = jwt.sign({ _id: newCaptain._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //const { password: _, ...captainData } = newCaptain._doc;

    res.status(201).json({
      success: true,
      message: "Captain registered successfully",
      token: token,
      captain: newCaptain,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginCaptain = async (req , res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }

        const {email , password} = req.body;
        const captain = await Captain.findOne({email}).select('+password');
        if(!captain){
            return res.status(401).json({success: false , message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password , captain.password);
        if(!isMatch){
            return res.status(401).json({success: false , message: "Invalid email or password"})
        }
        const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie('token' , token )

        res.status(200).json({
            success: true,
            message: "Captain logged in successfully",
            token: token,
            captain: captain
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        
    }
}

export const getcaptainProfile = async (req , res) => {
     res.status(200).json({
        success: true,
        message: "Captain profile fetched successfully",
        captain: req.captain
     })
}

export const logoutCaptain = async (req , res) => {

    const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    await BlacklistToken.create({token});

    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Captain logged out successfully"
    })


}
