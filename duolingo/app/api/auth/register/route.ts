import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Import Prisma client
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json(); // Get form data

    // Check if email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        clerkId: `${Date.now()}`, // Unique clerkId
      },
    });

    return NextResponse.json(newUser, { status: 201 }); // Respond with user data
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Server error
  }
}
