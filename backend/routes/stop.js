import express from "express";
import { prisma } from "../lib/prisma.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Add stop to trip
router.post("/", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { city, startDate, endDate, tripId, description } = req.body;
  
  const tid = parseInt(tripId);
  if (isNaN(tid)) return res.status(400).json({ error: "Invalid tripId" });

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tid, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  // Find max order for this trip
  const maxOrder = await prisma.stop.aggregate({
    where: { tripId: tid },
    _max: { order: true }
  });
  
  const nextOrder = (maxOrder._max?.order || 0) + 1;

  const stop = await prisma.stop.create({
    data: {
      city,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      tripId: tid,
      description: description || "",
      order: nextOrder
    }
  });
  res.json(stop);
});

// Reorder stops
router.patch("/reorder", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { stops } = req.body; // Array of { id, order }
  
  try {
    // First, verify that all stops belong to trips owned by the user
    const stopIds = stops.map(s => s.id);
    const validStops = await prisma.stop.findMany({
      where: {
        id: { in: stopIds },
        trip: { userId }
      }
    });

    if (validStops.length !== stops.length) {
      return res.status(403).json({ error: "Some stops are unauthorized or missing" });
    }

    await Promise.all(
      stops.map((stop) =>
        prisma.stop.update({
          where: { id: stop.id },
          data: { order: stop.order }
        })
      )
    );
    res.json({ message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete stop
router.delete("/:id", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const stopId = parseInt(req.params.id);

  // Verify stop ownership via trip
  const stopCheck = await prisma.stop.findFirst({
    where: { 
      id: stopId,
      trip: { userId }
    }
  });

  if (!stopCheck) return res.status(404).json({ error: "Stop not found or unauthorized" });

  await prisma.stop.delete({
    where: { id: stopId }
  });
  res.json({ message: "Stop deleted" });
});

export default router;
