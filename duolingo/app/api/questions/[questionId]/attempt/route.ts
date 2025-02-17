import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const questionId = parseInt(params.questionId);
    if (isNaN(questionId)) {
      throw new Error("Invalid question ID");
    }

    const { isCorrect, answer } = await request.json();

    // Save the attempt to the database
    const attempt = await db.attempt.create({
      data: {
        questionId,
        isCorrect,
        answer,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.error("Error saving attempt:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 