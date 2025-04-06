import {User} from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword =  await bcrypt.hash(password , 10)

    // Create a new user    
    const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    });
    
    await newUser.save();

    // Generate token after saving the user
    const token = jwt.sign({_id : User._id}, process.env.JWT_SECRET, {expiresIn : '1d'});

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: token,
        user: newUser,
      });
  } catch (error) {
console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error" });
  }
};


