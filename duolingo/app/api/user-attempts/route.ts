import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, questionId, isCorrect } = req.body;

      // Validate the input
      if (!userId || !questionId || typeof isCorrect !== "boolean") {
        return res.status(400).json({ error: "userId, questionId, and isCorrect are required" });
      }

      // Fetch user heart status
      const userHeart = await prisma.heart.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!userHeart) {
        return res.status(404).json({ error: "User heart record not found" });
      }

      // Check if the user is restricted due to 0 hearts
      const now = new Date();
      const lastUpdated = new Date(userHeart.createdAt);
      const isNewDay = now.toDateString() !== lastUpdated.toDateString();

      if (userHeart.heartCount === 0 && !userHeart.payment) {
        // Reset hearts to 5 if a new day has started
        if (isNewDay) {
          await prisma.heart.update({
            where: { id: parseInt(userId) },
            data: { heartCount: 5, createdAt: now },
          });
        } else {
          return res.status(403).json({ error: "You have 0 hearts. Try again tomorrow." });
        }
      }

      // Record attempt
      const userAttempt = await prisma.userAttempt.create({
        data: {
          userId: parseInt(userId),
          questionId: parseInt(questionId),
          isCorrect,
        },
      });

      if (isCorrect) {
        // Grant an achievement if correct
        await prisma.userAchievement.create({
          data: {
            userId: parseInt(userId),
            achievementId: 1, // Replace with actual achievement logic
          },
        });
      } else {
        // Deduct heart if incorrect and user is not premium
        if (!userHeart.payment) {
          await prisma.heart.update({
            where: { id: parseInt(userId) },
            data: { heartCount: userHeart.heartCount - 1 },
          });
        }
      }

      return res.status(200).json({ message: "Attempt recorded successfully", userAttempt });
    } catch (error) {
      console.error("Error processing attempt:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}