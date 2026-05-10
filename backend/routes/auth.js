import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashed } });
  
  // Auto login on signup to return token with name
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID in token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, image: true }
    });
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    // Safely get total trips planned by this user
    let tripsCount = 0;
    try {
      tripsCount = await prisma.trip.count({
        where: { userId: userId }
      });
    } catch (countErr) {
      console.error("Error counting trips:", countErr.message || countErr);
    }
    
    res.json({ 
      ...user, 
      stats: { 
        tripsPlanned: tripsCount,
        citiesExplored: 0,
        countriesVisited: 0
      } 
    });
  } catch (err) {
    console.error("Profile fetch error:", err.message || err);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashed }
    });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

router.patch("/profile", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { name, image } = req.body;

  // Security Validation
  if (name && name.trim().length > 50) {
    return res.status(400).json({ error: "Name must be under 50 characters" });
  }
  if (image && !image.startsWith("data:image/")) {
    return res.status(400).json({ error: "Invalid image format. Base64 data URL required." });
  }
  if (image && image.length > 2 * 1024 * 1024) {
    return res.status(400).json({ error: "Image size too large (max 2MB)" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { 
        name: name ? name.trim() : undefined, 
        image 
      },
      select: { id: true, name: true, email: true, image: true }
    });
    res.json(user);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
