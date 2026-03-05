import express from "express";
import { signup, login ,forgotPassword,
  resetPassword, logout} from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,} from "../validations/authValidation.js";
import { validate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/logout", logout);

export default router;