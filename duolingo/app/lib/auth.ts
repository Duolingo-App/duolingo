import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export async function registerUser(email: string, password: string, name: string, language: string | null, clerkId: string, image: string | null) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      language: language ? { connect: { id: Number(language) } } : undefined,
      clerkId,
      image,
    },
  });
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "10d" });
}
