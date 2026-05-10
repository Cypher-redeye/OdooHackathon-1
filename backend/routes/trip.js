import express from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, description, startDate, endDate, imageUrl, destinations } = req.body;
    const userId = parseInt(req.user.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const trip = await prisma.trip.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId,
        imageUrl,
        stops: {
          create: (destinations || []).map((city, index) => ({
            city,
            order: index + 1,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
          }))
        }
      },
      include: { stops: true }
    });
    res.json(trip);
  } catch (err) {
    console.error("Trip creation error:", err);
    res.status(500).json({ error: "An unexpected error occurred while creating the trip." });
  }
});

router.get("/", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(trips);
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const tripId = parseInt(req.params.id);

    const trip = await prisma.trip.findFirst({
      where: { 
        id: tripId,
        userId: userId
      },
      include: {
        packingItems: true,
        notes: true,
        stops: {
          include: { activities: true },
          orderBy: { order: "asc" }
        },
        budget: true
      },
    });

    if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const tripId = parseInt(req.params.id);

    // Verify ownership before delete
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId: userId }
    });

    if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

    await prisma.trip.delete({
      where: { id: tripId }
    });

    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        stops: true
      },
      orderBy: { id: "desc" },
    });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch community trips" });
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: {
          select: { name: true, email: true }
        },
        stops: {
          include: { activities: true },
          orderBy: { order: "asc" }
        },
      },
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trip details" });
  }
});

export default router;
