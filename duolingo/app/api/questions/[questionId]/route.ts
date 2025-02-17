import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    // Await params before accessing its properties
    const { questionId } = await params;
    const parsedQuestionId = parseInt(questionId);

    if (isNaN(parsedQuestionId)) {
      throw new Error("Invalid question ID");
    }

    const question = await db.question.findUnique({
      where: { id: parsedQuestionId },
      include: {
        lesson: {
          include: {
            language: true,
          },
        },
      },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Parse the options field as JSON
    const parsedOptions = JSON.parse(question.options);

    return NextResponse.json({
      ...question,
      options: parsedOptions,
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 