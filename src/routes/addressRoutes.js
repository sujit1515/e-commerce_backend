import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addAddress);
router.get("/", verifyToken, getAddresses);
router.put("/update/:id", verifyToken, updateAddress);
router.delete("/delete/:id", verifyToken, deleteAddress);
router.put("/default/:id", verifyToken, setDefaultAddress);

export default router;