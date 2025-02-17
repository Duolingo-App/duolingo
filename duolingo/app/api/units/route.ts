import type { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract the user ID from the request (e.g., from query params or headers)
    const userId = "1"

    

    // Fetch the user's language ID
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId), // Ensure the userId is an integer
      },
      select: {
        languageId: true, // Only fetch the languageId
      },
    });

    if (!user ) {
      return NextResponse.json({ error: 'User  not found' }, { status: 404 });
    }
    if ( !user.languageId) {
      return NextResponse.json({ error: ' language not found' }, { status: 404 });
    }

    // Fetch units and lessons for the user's language
    const units = await prisma.unit.findMany({
      where: {
        languageId: user.languageId, // Filter by the user's languageId
      },
      include: {
        lessons: {
          include: {
            questions: true, // Include questions for each lesson
          },
        },
      },
    });

    // Fetch the user's achievements or progress
    const userAchievements = await prisma.userAchievement.findMany({
      where: {
        userId: parseInt(userId), // Ensure the userId is an integer
      },
      include: {
        achievement: true,
      },
    });

    // Fetch the user's progress for lessons
    const userProgress = await prisma.userProgress.findMany({
      where: {
        userId: parseInt(userId), // Ensure the userId is an integer
      },
    });

    // Transform the data into the desired structure
    const result = units.map((unit:any) => ({
      id: `unit-${unit.id}`,
      title: unit.title || `Unit ${unit.id}`,
      description: unit.description || "No description available",
      color: "green", // You can customize this based on your needs
      guidebook: unit.guidebook,
      lessons: unit.lessons.map((lesson:any, index:any) => {
        // Check if the lesson is completed by the user
        const isCompleted = userProgress.some(
          (progress) => progress.lessonId === lesson.id
        );

        // Determine the status dynamically
        let status = "locked"; // Default status
        if (isCompleted) {
          status = "completed";
        } else if (index === 0 || userProgress.some(progress => progress.lessonId === unit.lessons[index - 1].id)) {
          status = "active";
        }

        return {
          id: `${lesson.id}`,
          status: status,
          position: index,
          xpPoints: 10, // Default XP points, you can customize this based on your logic
          title: lesson.title,
          
        };
      }),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}