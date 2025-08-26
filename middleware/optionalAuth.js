import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
  } catch (error) {
    console.log("Token invalido o expirado:", error.message);
  }
  next();
}