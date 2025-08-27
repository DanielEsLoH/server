import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";

export const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  return await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpires: Date.now() + 3600000, // 1 hour
  });
};

export const findUserByEmail = (email) => User.findOne({ email });
export const findUserByToken = (token) =>
  User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });
