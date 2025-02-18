// app/api/user-attempts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';// Ensure Prisma client is properly imported
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Extract token from Authorization header
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is required' },
        { status: 401 }
      );
    }

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const userId = parseInt(decoded.id);
    // Parse request body
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }

    const { questionId, isCorrect } = body;

    // Validate input
    if (!questionId || typeof isCorrect !== 'boolean') {
      return NextResponse.json(
        { error: 'questionId and isCorrect are required' },
        { status: 400 }
      );
    }

    // Fetch user heart status
    let userHeart = await prisma.heart.findFirst({
      where: { userId: userId },
    });
   
    if (!userHeart) {
      userHeart= await prisma.heart.create({
        data: {
          userId: userId,
          heartCount: 5,
          createdAt: new Date(),
          payment: false,
        },
      });
    }

    // Check and reset hearts if it's a new day
    const now = new Date();
    const lastUpdated = new Date(userHeart.createdAt);
    const isNewDay = now.toDateString() !== lastUpdated.toDateString();

    if (userHeart.heartCount === 0 && !userHeart.payment) {
      if (isNewDay) {
        await prisma.heart.update({
          where: { id: (userHeart.id) },
          data: { heartCount: 5, createdAt: now },
        });
        return;
      } else {
        return NextResponse.json(
          { error: "You have 0 hearts. Try again tomorrow." },
          { status: 403 }
        );
      }
    }
    if (userHeart.heartCount == 0) {
      return NextResponse.json(
        { error: "You have 0 hearts. Try again tomorrow." },
        { status: 403 }
      );
    }

    if (isCorrect) {
      const userAttempt = await prisma.userAttempt.create({
        data: {
          userId: userId,
          questionId: parseInt(questionId),
          isCorrect,
        },
      });
    }

    // Grant achievement or deduct heart
    if (!userHeart.payment && !isCorrect) {
      await prisma.heart.update({
        where: { id: userHeart.id },
        data: { heartCount: userHeart.heartCount - 1 },
      });
    }

    return NextResponse.json({
      message: "Attempt recorded successfully",
    });
  } catch (error: any) {
    console.log('Error processing attempt:', error.stack);
    
  }
}