import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const exercises = await db.question.findMany({
      select: {
        id: true,
        text: true,
        options: true,
        correctAnswer: true,
        type: true,
        lessonId: true,
      },
    });

    const formattedExercises = exercises.map(exercise => ({
      ...exercise,
      options: JSON.parse(exercise.options.toString()),
      type: exercise.type.toLowerCase(),
    }));

    return NextResponse.json(formattedExercises);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercises" },
      { status: 500 }
    );
  }
} 