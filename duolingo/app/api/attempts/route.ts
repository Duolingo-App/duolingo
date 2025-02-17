import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth"; // You'll need to implement authentication

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, isCorrect } = body;

    const attempt = await db.userAttempt.create({
      data: {
        userId: session.user.id,
        questionId,
        isCorrect,
      },
    });

    return NextResponse.json(attempt);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }
} 