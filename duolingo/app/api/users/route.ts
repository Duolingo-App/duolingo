import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  try {
    // Get the token from the authorization header
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUserId = Number(decoded.id);

    // Fetch all users except the current user
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: currentUserId
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
