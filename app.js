import express from        "express";
import cors from           "cors";
import authRoutes from     "./src/routes/authRoutes.js";
import productRoutes from  "./src/routes/productRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import cartRoutes from     "./src/routes/cartRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

//Auth
app.use("/api/v1/auth", authRoutes);
//Product
app.use("/api/v1/product", productRoutes);
//Wishlist
app.use("/api/v1/wishlist", wishlistRoutes);
//Cart
app.use("/api/v1/cart", cartRoutes);
//COntact
app.use("/api/v1/contact", contactRoutes); 
//Profile
app.use("/api/v1/profile", profileRoutes);


export default app;