import { NextResponse, NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

// Define a type for the decoded token
interface DecodedToken {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the token from the authorization header
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const userId = Number(decoded.id);

    // Get the language ID from the request body
    const { languageId } = await request.json();

    // Update the user's language
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { 
        languageId: Number(languageId) 
      },
      include: {
        language: true // Include the selected language details
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user language:', error);
    return NextResponse.json({ error: 'Failed to update language' }, { status: 500 });
  }
}
