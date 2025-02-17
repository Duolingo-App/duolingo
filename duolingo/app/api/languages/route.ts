import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const languages = await prisma.userLanguage.findMany({
      select: {
        id: true,
        name: true,
        flag: true,
        // Add any other fields you want to display
      }
    });

    // If no languages exist, create default languages
    if (languages.length === 0) {
      const defaultLanguages = [
        { name: 'Anglais', flag: '🇺🇸' },
        { name: 'Espagnol', flag: '🇪🇸' },
        { name: 'Italien', flag: '🇮🇹' },
        { name: 'Allemand', flag: '🇩🇪' },
        { name: 'Portugais', flag: '🇧🇷' }
      ];

      await prisma.userLanguage.createMany({
        data: defaultLanguages
      });

      // Fetch the newly created languages
      return NextResponse.json(await prisma.userLanguage.findMany({
        select: {
          id: true,
          name: true,
          flag: true,
        }
      }));
    }

    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json({ error: 'Failed to fetch languages' }, { status: 500 });
  }
}
