import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    await db.$connect();
    console.log("Database connected, fetching question:", params.questionId);

    const question = await db.question.findUnique({
      where: {
        id: parseInt(params.questionId)
      },
    });

    console.log("Found question:", question);

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const formattedQuestion = {
      ...question,
      options: JSON.parse(question.options.toString()),
      type: question.type.toLowerCase(),
    };

    return NextResponse.json(formattedQuestion);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: `Failed to fetch question: ${error.message}` },
      { status: 500 }
    );
  }
}