import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed Languages with random data
  const english = await prisma.language.create({
    data: {
      name: 'English',
      description: 'The most widely spoken language in the world.',
    },
  });

  const french = await prisma.language.create({
    data: {
      name: 'French',
      description: 'A romantic language spoken in many countries.',
    },
  });

  // Seed Lessons with Faker for dynamic content
  const englishLesson1 = await prisma.lesson.create({
    data: {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      languageId: english.id,
    },
  });

  const frenchLesson1 = await prisma.lesson.create({
    data: {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      languageId: french.id,
    },
  });

  // Seed Questions with Faker
  await prisma.question.create({
    data: {
      lessonId: englishLesson1.id,
      text: 'How do you say "Hello" in English?',
      options: JSON.stringify(['Hello', 'Bonjour', 'Hola', 'Ciao']),
      correctAnswer: 'Hello',
    },
  });

  await prisma.question.create({
    data: {
      lessonId: frenchLesson1.id,
      text: 'How do you say "Hello" in French?',
      options: JSON.stringify(['Hello', 'Bonjour', 'Hola', 'Ciao']),
      correctAnswer: 'Bonjour',
    },
  });

  // Seed Users with Faker
  const user1 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: 'password123',
    },
  });

  // Seed UserProgress
  await prisma.userProgress.create({
    data: {
      userId: user1.id,
      lessonId: englishLesson1.id,
    },
  });

  // Seed UserAttempts
  await prisma.userAttempt.create({
    data: {
      userId: user1.id,
      questionId: 1, // Assuming the first question is the one created above
      isCorrect: true,
    },
  });

  // Seed UserPoints
  await prisma.userPoint.create({
    data: {
      userId: user1.id,
      points: 10,
    },
  });

  // Seed Achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: 'First Lesson Completed',
      pointsRequired: 10,
      description: 'Complete your first lesson.',
    },
  });

  // Seed UserAchievements
  await prisma.userAchievement.create({
    data: {
      userId: user1.id,
      achievementId: achievement1.id,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
