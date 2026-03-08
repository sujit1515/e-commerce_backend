
import Profile from "../models/Profile.js";
import fs from "fs";
import path from "path";

// GET profile by user
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// CREATE or UPDATE profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const profile = await Profile.findOne({ user: req.user.id });

    // Remove old avatar if exists
    if (profile?.avatar) {
      const oldPath = path.join("uploads", profile.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const avatar = req.file.filename;

    if (profile) {
      profile.avatar = avatar;
      await profile.save();
      return res.status(200).json({ success: true, message: "Profile picture updated", data: profile });
    } else {
      const newProfile = await Profile.create({ user: req.user.id, email: req.user.email, avatar });
      res.status(201).json({ success: true, message: "Profile created", data: newProfile });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE profile picture
export const deleteProfilePicture = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile || !profile.avatar) return res.status(404).json({ success: false, message: "No profile picture found" });

    const filePath = path.join("uploads", profile.avatar);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    profile.avatar = "";
    await profile.save();

    res.status(200).json({ success: true, message: "Profile picture removed", data: profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};