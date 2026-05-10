import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import tripRoutes from "./routes/trip.js";
import packingRoutes from "./routes/packing.js";
import noteRoutes from "./routes/note.js";
import stopRoutes from "./routes/stop.js";
import budgetRoutes from "./routes/budget.js";
import activityRoutes from "./routes/activity.js";
import { prisma } from "./lib/prisma.js";

dotenv.config();

const app = express();

// Security Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

const corsOptions = {
  origin: [
    "http://localhost:3000", 
    "http://127.0.0.1:3000", 
    "http://localhost:3001",
    "https://odoohackathon-9sx4.onrender.com", // Your Render Backend
    process.env.FRONTEND_URL // Future Vercel URL
  ].filter(Boolean),
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/activities", activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
