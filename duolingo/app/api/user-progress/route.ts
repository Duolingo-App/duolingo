import { NextResponse } from 'next/server'
import {prisma} from '@/app/lib/prisma'

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const userProgress = await prisma.userProgress.findMany({
      where: { userId: parseInt(userId) },
      select: { lessonId: true, completedAt: true }
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}