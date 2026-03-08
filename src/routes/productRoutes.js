import express from "express";
import { addProduct, getProductById ,getAllProducts } from "../controllers/productController.js";

const router = express.Router();
// Add product (Admin only)
router.post("/add", addProduct);

router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;



