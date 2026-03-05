import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import app from "./app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});