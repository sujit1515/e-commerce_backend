import express from        "express";
import cors from           "cors";
import authRoutes from     "./src/routes/authRoutes.js";
import productRoutes from  "./src/routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//Auth
app.use("/api/v1/auth", authRoutes);

//Product
app.use("/api/v1/products", productRoutes);

export default app;