import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Import Prisma client
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import fs from "fs/promises"; // Import fs for file system operations
import path from "path"; // Import path for handling file paths

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Use formData to handle multipart/form-data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File | null; // Get the image file

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
        clerkId: `${Date.now()}`,
        image: image ? image.name : null, // Store image name or path if needed
      },
    });

    // Save the image to the uploads directory
    if (image) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure the uploads directory exists

      const filePath = path.join(uploadDir, image.name); // Define the file path
      const buffer = await image.arrayBuffer(); // Get the image buffer
      await fs.writeFile(filePath, Buffer.from(buffer)); // Write the file to the uploads directory

      // Save file metadata to the media table
      await prisma.media.create({
        data: {
          filename: image.name,
          filepath: `/uploads/${image.name}`,
          mimetype: image.type,
          size: image.size,
        },
      });
    }

    return NextResponse.json(newUser, { status: 201 }); // Respond with user data
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Server error
  }
}
