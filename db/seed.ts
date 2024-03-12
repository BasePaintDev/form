import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
  const users = [
    {
      name: 'User',
      email: 'user@nextmail.com',
      password: '123456',
    },
    {
      name: 'Admin',
      email: 'admin@testmail.com',
      password: '654321',
    },
  ];

  // Seed Users
  users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const response = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
