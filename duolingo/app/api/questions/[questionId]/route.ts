import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    console.log("Fetching question ID:", params.questionId);
    
    const question = await db.question.findUnique({
      where: {
        id: parseInt(params.questionId)
      },
    });

    console.log("Found question:", question);

    if (!question) {
      return NextResponse.json(
        { error: `Question with ID ${params.questionId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...question,
      options: JSON.parse(question.options.toString()),
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch question" },
      { status: 500 }
    );
  }
} 