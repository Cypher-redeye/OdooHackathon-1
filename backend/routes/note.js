import express from "express";
import { prisma } from "../lib/prisma.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Get all notes for a trip
router.get("/:tripId", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const tripId = parseInt(req.params.tripId);

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  const notes = await prisma.note.findMany({
    where: { tripId },
    orderBy: { createdAt: "desc" }
  });
  res.json(notes);
});

// Add note
router.post("/", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const { title, content, category, tripId } = req.body;
  const tid = parseInt(tripId);

  // Verify trip ownership
  const trip = await prisma.trip.findFirst({
    where: { id: tid, userId }
  });

  if (!trip) return res.status(404).json({ error: "Trip not found or unauthorized" });

  const note = await prisma.note.create({
    data: { title, content, category, tripId: tid }
  });
  res.json(note);
});

// Delete note
router.delete("/:id", requireAuth, async (req, res) => {
  const userId = parseInt(req.user.id);
  const noteId = parseInt(req.params.id);

  // Verify note ownership via trip
  const noteCheck = await prisma.note.findFirst({
    where: { 
      id: noteId,
      trip: { userId }
    }
  });

  if (!noteCheck) return res.status(404).json({ error: "Note not found or unauthorized" });

  await prisma.note.delete({
    where: { id: noteId }
  });
  res.json({ message: "Note deleted" });
});

export default router;
