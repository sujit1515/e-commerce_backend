import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/v1/contact/send
router.post("/send", createContact);

export default router;