import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { questionId: any } }
) {
  try {
    const lessonId = await parseInt(params?.questionId);
    if (isNaN(lessonId)) {
      throw new Error("Invalid lesson ID");
    }

    // Fetch the lesson and include all its questions with attempts
    const lesson = await db.lesson.findUnique({
      where: { id: lessonId },
      include: {
        questions: {
          include: {
            attempts: true, // Include attempts for each question
          },
        },
      },
    });

    if (!lesson) {
      console.error(`Lesson with ID ${lessonId} not found`);
      return NextResponse.json(
        { error: `Lesson with ID ${lessonId} not found` },
        { status: 404 }
      );
    }

    // Parse the options field for each question
    const parsedQuestions = lesson.questions.map((q:any) => ({
      ...q,
      options: JSON.parse(q.options),
    }));

    return NextResponse.json({
      ...lesson,
      questions: parsedQuestions,
    });
  } catch (error:any) {
    console.error("Error fetching lesson and questions:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 