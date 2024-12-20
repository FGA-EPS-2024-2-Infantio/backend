import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const fixedCuid = 'cl7f9p76r0000l3x8mtr0gjc3';

  const school = await prisma.school.create({
    data: {
      id: fixedCuid,
      name: 'Escola Exemplo',
      directorEmail: 'diretor@escolaexemplo.com',
      userId: 'cm4q5ojsy00007gz6rwwp8t42',
      numberStudents: 500,
    },
  });

}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
