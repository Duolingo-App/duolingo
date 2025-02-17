import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Languages
  const english = await prisma.language.upsert({
    where: { name: "English" },
    update: {},
    create: {
      name: "English",
      description: "Learn English",
      flag: "🇺🇸",
    },
  });

  const spanish = await prisma.language.upsert({
    where: { name: "Spanish" },
    update: {},
    create: {
      name: "Spanish",
      description: "Learn Spanish",
      flag: "🇪🇸",
    },
  });

  // Users
  const user1 = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      password: "securepassword",
      name: "John Doe",
      clerkId: "clerk123",
      image: "https://example.com/john.jpg",
      languageId: english.id,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "maria@example.com" },
    update: {},
    create: {
      email: "maria@example.com",
      password: "anotherpassword",
      name: "Maria Gonzalez",
      clerkId: "clerk456",
      image: "https://example.com/maria.jpg",
      languageId: spanish.id,
    },
  });

  // Hearts
  await prisma.heart.createMany({
    data: [
      { userId: user1.id, heartCount: 5, payment: false },
      { userId: user2.id, heartCount: 3, payment: true },
    ],
  });

  // Units
  const unit1 = await prisma.unit.create({
    data: {
      title: "Basics",
      description: "Learn basic words",
      color: "#ffcc00",
      guidebook: true,
      languageId: english.id,
    },
  });

  // Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Greetings",
      description: "Learn basic greetings",
      unitId: unit1.id,
    },
  });

  // Questions
  const question1 = await prisma.question.create({
    data: {
      lessonId: lesson1.id,
      type: "multiple-choice",
      text: "How do you say 'Hello' in English?",
      hint: JSON.stringify(["Hi", "Hello", "Bye"]),
      correctAnswer: "Hello",
    },
  });

  // User Progress
  await prisma.userProgress.create({
    data: {
      userId: user1.id,
      lessonId: lesson1.id,
    },
  });

  // User Attempts
  await prisma.userAttempt.create({
    data: {
      userId: user1.id,
      questionId: question1.id,
      isCorrect: true,
    },
  });

  // Points
  await prisma.userPoint.create({
    data: {
      userId: user1.id,
      points: 50,
    },
  });

  // Achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: "First Lesson Complete",
      pointsRequired: 10,
      description: "Complete your first lesson",
    },
  });

  // User Achievement
  await prisma.userAchievement.create({
    data: {
      userId: user1.id,
      achievementId: achievement1.id,
    },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
