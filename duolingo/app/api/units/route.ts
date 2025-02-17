import type { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const userId = decoded.id;

    // Fetch the user's language ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { languageId: true },
    });

    if (!user || !user.languageId) {
      return NextResponse.json(
        { error: "User or language not found" },
        { status: 404 }
      );
    }

    // Fetch units and lessons for the user's language
    const units = await prisma.unit.findMany({
      where: { languageId: user.languageId },
      include: { lessons: { include: { questions: true } } },
    });

    // Fetch the user's progress and achievements
    const [userProgress, userAchievements] = await Promise.all([
      prisma.userProgress.findMany({ where: { userId: parseInt(userId) } }),
      prisma.userAchievement.findMany({
        where: { userId: parseInt(userId) },
        include: { achievement: true },
      }),
    ]);

    // Transform the data into the desired structure
    const result = units.map((unit) => ({
      id: `unit-${unit.id}`,
      title: unit.title || `Unit ${unit.id}`,
      description: unit.description || "No description available",
      color: "green",
      guidebook: unit.guidebook,
      lessons: unit.lessons.map((lesson, index) => {
        const isCompleted = userProgress.some(
          (progress) => progress.lessonId === lesson.id
        );

        let status = "locked";
        if (isCompleted) {
          status = "completed";
        } else if (
          index === 0 ||
          userProgress.some(
            (progress) => progress.lessonId === unit.lessons[index - 1].id
          )
        ) {
          status = "active";
        }

        return {
          id: `${lesson.id}`,
          status,
          position: index,
          xpPoints: 10,
          title: lesson.title,
        };
      }),
    }));

    return NextResponse.json(result);
  } catch (error) {
    // console.error(error);
    // return NextResponse.json(
    //   { error: "Failed to fetch data" },
    //   { status: 500 }
    // );
  }
}