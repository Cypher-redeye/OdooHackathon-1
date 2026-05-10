import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.post('/google', async (req, res) => {
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ message: 'Profile data is required' });
  }

  try {
    const { email, name, picture, sub: googleId } = profile;

    if (!email) {
      return res.status(400).json({ message: 'Email not provided by Google' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          password: '', // No password for Google users
        },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: 'Server error during Google authentication' });
  }
});

export default router;
