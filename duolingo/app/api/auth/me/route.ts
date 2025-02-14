import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

// Define a type for the decoded token
interface DecodedToken {
  id: string; // Keep as string for the token
}

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken; // Cast to DecodedToken
    const user = await prisma.user.findUnique({ where: { id: Number(decoded.id) } }); // Convert id to number

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
