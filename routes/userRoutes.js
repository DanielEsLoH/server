import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { protect } from "../middleware/auth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", optionalAuth, getCars);

export default userRouter;
