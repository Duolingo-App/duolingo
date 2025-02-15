import { NextResponse, NextRequest } from "next/server";
import {prisma} from "@/app/lib/prisma";
import fs from "fs/promises";
import path from "path";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Save the file to the uploads directory
    const filePath = path.join(uploadDir, file.name);
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));
    // Save file metadata to the database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        filepath: `/uploads/${file.name}`,
        mimetype: file.type,
        size: file.size,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}