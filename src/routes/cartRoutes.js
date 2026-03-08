import express from "express";
import { addToCart ,removeCartItem ,updateCartQuantity, getCart, clearCart } from "../controllers/cartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken , addToCart);
router.delete("/remove/:productId", verifyToken, removeCartItem);
router.put("/update/:productId", verifyToken, updateCartQuantity);
router.delete("/clear", verifyToken, clearCart);

export default router;