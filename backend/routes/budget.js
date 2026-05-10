import express from "express";
import { prisma } from "../lib/prisma.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Get budget for a trip
router.get("/:tripId", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const tripId = parseInt(req.params.tripId);

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  let budget = await prisma.budget.findUnique({
    where: { tripId }
  });
  if (!budget) {
    // Create default if not exists
    budget = await prisma.budget.create({
      data: { tripId }
    });
  }
  res.json(budget);
});

// Update budget
router.patch("/:tripId", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const tripId = parseInt(req.params.tripId);
  const { transport, stay, meals, activities } = req.body;

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  const budget = await prisma.budget.upsert({
    where: { tripId },
    update: { transport, stay, meals, activities },
    create: { transport, stay, meals, activities, tripId }
  });
  res.json(budget);
});

export default router;
