
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "" }, // URL or filename of profile picture
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);