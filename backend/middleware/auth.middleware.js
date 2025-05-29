import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import { BlacklistToken } from "../models/blacklistTokes.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const authUser = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;


    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }else{
        try {

            const isBlacklisted = await BlacklistToken.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("DECODED USER", decoded);
            req.user = await User.findById(decoded._id).select("-password");//req me user ki details attach karde
            // const testuser = await User.findById(decoded._id);
            // console.log("RAW USER:", testuser);

            console.log("USER MIDDEWARE", req.user);
            
            return next();
        } catch (error) {
            return res.status(401).json({message : "Unauthorized"});
        }
    }
}

export const authCaptain = async (req , res , next) => {
    const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }else{
        try {
            const isBlacklisted = await BlacklistToken.findOne({token});
            if(isBlacklisted){
                return res.status(401).json({message : "Unauthorized"});
            }
    
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            console.log("DECODED CAPTAIN", decoded);
            req.captain = await Captain.findById(decoded._id).select("-password");
            console.log("CAPTAIN MIDDEWARE", req.captain);

            return next();
            
        } catch (error) {
            return res.status(401).json({message : "Unauthorized"}); 
        }
    }
}