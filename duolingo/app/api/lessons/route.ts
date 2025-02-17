import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const lessons = await db.lesson.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        languageId: true,
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
} 