import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
import mongoose from "mongoose";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fields." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Fill all the fields." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      message: `Welcome back, ${user.name}!`,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//Get User data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all cars for the frontend
export const getCars = async (req, res) => {
  try {
    const query = { isAvailable: true };
    if (req.user?._id) {
      query.owner = { $ne: new mongoose.Types.ObjectId(req.user._id) };
    }

    const cars = await Car.find(query).populate("owner", "name email role");
    return res.json({ success: true, cars });
  } catch (error) {
    console.error("Error en getCars:", error);
    return res.json({ success: false, message: error.message });
  }
};
