import { NextResponse } from "next/server";
import { authenticateUser } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const token = await authenticateUser(email, password);

    if (!token) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}