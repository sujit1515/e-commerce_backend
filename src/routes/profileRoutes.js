import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getProfile, uploadProfilePicture, deleteProfilePicture } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.post("/upload", verifyToken, uploadProfilePicture);
router.put("/update", verifyToken, uploadProfilePicture);
router.delete("/remove", verifyToken, deleteProfilePicture);

export default router;