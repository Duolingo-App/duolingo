import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed UserLanguages
  const languages = ['English', 'French', 'Spanish', 'German'];
  const userLanguages = await Promise.all(
    languages.map(async (lang) => {
      return await prisma.userLanguage.upsert({
        where: { name: lang },
        update: {},
        create: {
          name: lang,
          flag: faker.image.urlLoremFlickr({ 
            width: 100, 
            height: 100, 
            category: 'flag',
            randomize: true 
          }),
        },
      });
    })
  );

  // Seed Languages
  const languageModels = await Promise.all(
    languages.map(async (lang) => {
      return await prisma.language.upsert({
        where: { name: lang },
        update: {},
        create: {
          name: lang,
          description: `Language model for ${lang}`,
          flag: faker.image.urlLoremFlickr({ 
            width: 100, 
            height: 100, 
            category: 'flag',
            randomize: true 
          }),
        },
      });
    })
  );

  // Seed Lessons
  const lessons = await Promise.all(
    languageModels.map(async (language) => {
      return await prisma.lesson.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          languageId: language.id,
        },
      });
    })
  );

  // Seed Questions
  const questions = await Promise.all(
    lessons.map(async (lesson) => {
      return await prisma.question.create({
        data: {
          lessonId: lesson.id,
          text: faker.lorem.sentence(),
          options: JSON.stringify([faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()]),
          correctAnswer: faker.lorem.word(),
        },
      });
    })
  );

  // Seed Users
  const users = await Promise.all(
    userLanguages.map(async (language) => {
      return await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: 'password123',
          languageId: language.id,
        },
      });
    })
  );

  // Seed UserProgress
  await Promise.all(
    users.map(async (user, index) => {
      return await prisma.userProgress.create({
        data: {
          userId: user.id,
          lessonId: lessons[index % lessons.length].id, // Assign lessons in a round-robin fashion
        },
      });
    })
  );

  // Seed UserAttempts
  await Promise.all(
    users.map(async (user) => {
      return await prisma.userAttempt.create({
        data: {
          userId: user.id,
          questionId: questions[Math.floor(Math.random() * questions.length)].id, // Randomly assign questions
          isCorrect: Math.random() > 0.5, // Randomly determine if the answer is correct
        },
      });
    })
  );

  // Seed UserPoints
  await Promise.all(
    users.map(async (user) => {
      return await prisma.userPoint.create({
        data: {
          userId: user.id,
          points: Math.floor(Math.random() * 100), // Random points between 0 and 100
        },
      });
    })
  );

  // Seed Achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: 'First Lesson Completed',
      pointsRequired: 10,
      description: 'Complete your first lesson.',
    },
  });

  // Seed UserAchievements
  await Promise.all(
    users.map(async (user) => {
      return await prisma.userAchievement.create({
        data: {
          userId: user.id,
          achievementId: achievement1.id,
        },
      });
    })
  );

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