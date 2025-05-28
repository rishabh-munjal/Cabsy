import { User } from "../models/user.model.js";
import { BlacklistToken } from "../models/blacklistTokes.model.js";
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token after saving the user
    const token = jwt.sign({ _id: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email and include the password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.error("Login failed: User not found");
      return res.status(401).json({ message: "Invalid email or Password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Login failed: Incorrect password");
      return res.status(401).json({ message: "Invalid email or Password" });
    }


    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token" , token)

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });
    
};

export const logout = async (req , res) => {
  const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
  res.clearCookie("token")

  //blackist the token in the database

  await BlacklistToken.create({ token });


  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}

