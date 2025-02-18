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

  // Create a unit
  const unit = await prisma.unit.create({
    data: {
      title: 'Unit 1: Basics',
      description: 'Learn the basics of the language',
      color: '#58CC02',
      language: {
        connect: { id: language.id },
      },
    },
  });

  // Now create lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Lesson 1: Basics',
      description: 'Learn the basics of the language',
      unit: {
        connect: { id: unit.id },
      },
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Lesson 2: Advanced',
      description: 'Advanced language concepts',
      unit: {
        connect: { id: unit.id },
      },
    },
  });

  // Questions for Lesson 1
  await prisma.question.createMany({
    data: [
      {
        lessonId: lesson1.id,
        text: 'TRANSLATE "Hello"',
        options: JSON.stringify([]),
        correctAnswer: 'Bonjour',
        type: 'TRANSLATE',
        
      },
      {
        lessonId: lesson1.id,
        text: 'What is "Goodbye" in French?',
        options: JSON.stringify(['Bonjour', 'Au revoir', 'Merci', "S'il vous plaît"]),
        correctAnswer: 'Au revoir',
        type: 'SELECT',
        
      },
      {
        lessonId: lesson1.id,
        text: 'Arrange the words: "I / am / learning"',
        options: JSON.stringify(["I", "am", "learning"]),
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
        options: JSON.stringify([]),
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
        options: JSON.stringify([]),
        correctAnswer: 'Merci',
        type: 'TRANSLATE',
        
      },
      {
        lessonId: lesson2.id,
        text: 'What is "Please" in French?',
        options: JSON.stringify(["Bonjour", "Au revoir", "Merci"]),
        correctAnswer: 'S\'il vous plaît',
        type: 'SELECT',
        
      },
      {
        lessonId: lesson2.id,
        text: 'ARRANGE the words: "The / cat / is / sleeping"',
        options: JSON.stringify(['The', 'cat', 'is', 'sleeping']),
        correctAnswer: 'The cat is sleeping',
        type: 'ARRANGE',
        
      },
      {
        lessonId: lesson2.id,
        text: 'LISTEN to the audio and type what you hear',
        options: JSON.stringify([]),
        correctAnswer: 'Merci',
        type: 'LISTEN',
      },
      {
        lessonId: lesson2.id,
        text: 'SPEAK the phrase: "Good morning"',
        options: JSON.stringify([]),
        correctAnswer: 'Good morning',
        type: 'SPEAK',
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
