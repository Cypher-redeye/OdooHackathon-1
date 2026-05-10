import express from "express";
import { prisma } from "../lib/prisma.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Get all activities for a stop
router.get("/:stopId", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const stopId = parseInt(req.params.stopId);

  try {
    // Verify stop ownership via trip
    const stopCheck = await prisma.stop.findFirst({
      where: { id: stopId, trip: { userId } }
    });

    if (!stopCheck) return res.status(404).json({ error: "Stop not found or unauthorized" });

    const activities = await prisma.activity.findMany({
      where: { stopId },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add activity to a stop
router.post("/", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { name, cost, stopId } = req.body;
  const sid = parseInt(stopId);

  try {
    // Verify stop ownership via trip
    const stopCheck = await prisma.stop.findFirst({
      where: { id: sid, trip: { userId } }
    });

    if (!stopCheck) return res.status(404).json({ error: "Stop not found or unauthorized" });

    const activity = await prisma.activity.create({
      data: {
        name,
        cost: parseFloat(cost),
        stopId: sid,
      },
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an activity
router.delete("/:id", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const activityId = parseInt(req.params.id);

  try {
    // Verify activity ownership via stop -> trip
    const activityCheck = await prisma.activity.findFirst({
      where: {
        id: activityId,
        stop: { trip: { userId } }
      }
    });

    if (!activityCheck) return res.status(404).json({ error: "Activity not found or unauthorized" });

    await prisma.activity.delete({
      where: { id: activityId },
    });
    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
