import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users.map(u => ({ id: u.id, name: u.name, email: u.email })));
  
  const trips = await prisma.trip.findMany({ take: 5 });
  console.log('Recent Trips:', trips.map(t => ({ id: t.id, name: t.name, userId: t.userId })));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
