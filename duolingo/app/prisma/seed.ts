import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if the Language record already exists
  const existingLanguage = await prisma.language.findUnique({
    where: { name: 'French' },
  });

  // If it doesn't exist, create it
  const language = existingLanguage || await prisma.language.create({
    data: {
      name: 'French',
      description: 'Learn French',
      flag: '🇫🇷',
    },
  });

  // Create 2 lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Lesson 1: Basics',
      description: 'Learn the basics of the language',
      language: {
        connect: { id: language.id },
      },
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Lesson 2: Advanced',
      description: 'Advanced language concepts',
      language: {
        connect: { id: language.id },
      },
    },
  });

  // Questions for Lesson 1
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson1.id,
        text: 'TRANSLATE "Hello"',
        options: JSON.stringify([]), // No options for translation
        correctAnswer: 'Bonjour',
        type: 'TRANSLATE',
      },
      {
        lessonId: lesson1.id,
        text: 'What is "Goodbye" in French?',
        options: JSON.stringify(['Bonjour', 'Au revoir', 'Merci', "S\'il vous plaît"]), // Correct JSON format
        correctAnswer: 'Au revoir',
        type: 'SELECT',
      },
      {
        lessonId: lesson1.id,
        text: 'Arrange the words: "I / am / learning"',
        options: JSON.stringify(["I", "am", "learning"]), // Correct JSON format
        correctAnswer: 'I am learning',
        type: 'ARRANGE',
      },
      {
        lessonId: lesson1.id,
        text: 'LISTEN to the audio and type what you hear',
        options: JSON.stringify([]),
        correctAnswer: 'Bonjour',
        type: 'LISTEN',
       
      },
      {
        lessonId: lesson1.id,
        text: 'SPEAK the phrase: "How are you?"',
        options: JSON.stringify([]), // No options for SPEAKing
        correctAnswer: 'How are you?',
        type: 'SPEAK',
      },
    ],
  });

  // Questions for Lesson 2
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson2.id,
        text: 'TRANSLATE "Thank you"',
        options: JSON.stringify([]), // No options for translation
        correctAnswer: 'Merci',
        type: 'TRANSLATE',
      },
      {
        lessonId: lesson2.id,
        text: 'What is "Please" in French?',
        options: JSON.stringify(["Bonjour", "Au revoir", "Merci"]), // Valid JSON array
        correctAnswer: 'S\'il vous plaît',
        type: 'SELECT', // Consistent lowercase
      },
      {
        lessonId: lesson2.id,
        text: 'ARRANGE the words: "The / cat / is / sleeping"',
        options: JSON.stringify(['The', 'cat', 'is', 'sleeping']), // Valid JSON array
        correctAnswer: 'The cat is sleeping',
        type: 'ARRANGE', // Consistent lowercase
      },
      {
        lessonId: lesson2.id,
        text: 'LISTEN to the audio and type what you hear',
        options: JSON.stringify([]), // No options for LISTENing
        correctAnswer: 'Merci',
        type: 'LISTEN',
      },
      {
        lessonId: lesson2.id,
        text: 'SPEAK the phrase: "Good morning"',
        options: JSON.stringify([]), // No options for SPEAKing
        correctAnswer: 'Good morning',
        type: 'SPEAK',
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });