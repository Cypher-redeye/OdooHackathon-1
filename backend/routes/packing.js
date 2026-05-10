import express from "express";
import { prisma } from "../lib/prisma.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Get all packing items for a trip
router.get("/:tripId", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const tripId = parseInt(req.params.tripId);

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  const items = await prisma.packingItem.findMany({
    where: { tripId }
  });
  res.json(items);
});

// Add packing item
router.post("/", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { name, category, tripId } = req.body;
  const tid = parseInt(tripId);

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tid, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  const item = await prisma.packingItem.create({
    data: { name, category, tripId: tid }
  });
  res.json(item);
});

// Update packed status
router.patch("/:id", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const itemId = parseInt(req.params.id);
  const { packed } = req.body;

  // Verify item ownership via trip
  const itemCheck = await prisma.packingItem.findFirst({
    where: { 
      id: itemId,
      trip: { userId }
    }
  });

  if (!itemCheck) return res.status(404).json({ error: "Item not found or unauthorized" });

  const item = await prisma.packingItem.update({
    where: { id: itemId },
    data: { packed }
  });
  res.json(item);
});

// Delete packing item
router.delete("/:id", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const itemId = parseInt(req.params.id);

  // Verify item ownership via trip
  const itemCheck = await prisma.packingItem.findFirst({
    where: { 
      id: itemId,
      trip: { userId }
    }
  });

  if (!itemCheck) return res.status(404).json({ error: "Item not found or unauthorized" });

  await prisma.packingItem.delete({
    where: { id: itemId }
  });
  res.json({ message: "Item deleted" });
});

export default router;
