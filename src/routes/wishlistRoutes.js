import express from "express";
import { getWishlist ,addWishlist, removeWishlist, moveWishlistToCart, toggleWishlist} from "../controllers/wishlistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getWishlist);
router.post("/add", verifyToken, addWishlist);
router.delete("/remove", verifyToken, removeWishlist);
router.post("/move-to-cart", verifyToken, moveWishlistToCart);
router.post("/toggle", verifyToken, toggleWishlist);


export default router;