import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';// Ensure Prisma client is properly imported
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is required' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const userId = parseInt(decoded.id)

    const userHeart = await prisma.heart.findFirst({
      where: { userId: userId },
      select: { heartCount: true }
    })

    return NextResponse.json({
      hearts: userHeart?.heartCount || 5
    })
  } catch (error) {
    console.error('Error fetching hearts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}