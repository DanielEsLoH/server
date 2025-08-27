import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../services/emailService.js";
import {
  createUser,
  findUserByEmail,
  findUserByToken,
} from "../services/userService.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import bcrypt from "bcrypt";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Fill all the fields correctly." });
    }

    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await createUser(name, email, password);

    // Generar link de verificación
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${user.verificationToken}`;
    await sendVerificationEmail(user.email, verifyUrl);

    res.status(201).json({
      success: true,
      message: "User registered. Please verify your email to continue.",
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
      message: `Welcome back, ${user.name}!`,
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await findUserByToken(token);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get Cars
export const getCars = async (req, res) => {
  try {
    const query = { isAvailable: true };

    if (req.user?._id) {
      query.owner = { $ne: req.user._id };
    }

    const cars = await Car.find(query).populate("owner", "name email role");
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error("Error in getCars:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get User Data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
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
