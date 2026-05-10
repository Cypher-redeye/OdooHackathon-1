import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, description, startDate, endDate, userId } = req.body;
  const trip = await prisma.trip.create({
    data: {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
    },
  });
  res.json(trip);
});

router.get("/:userId", async (req, res) => {
  const trips = await prisma.trip.findMany({
    where: { userId: parseInt(req.params.userId) },
    include: { stops: true, budget: true },
  });
  res.json(trips);
});

export default router;
