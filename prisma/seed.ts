import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      bio: "British author, best known for the Harry Potter series.",
      birthdate: new Date("1965-07-31"),
      books: {
        create: [
          {
            title: "Harry Potter and the Philosopher's Stone",
            description: "The first book in the Harry Potter series.",
            published_date: new Date("1997-06-26"),
          },
          {
            title: "Harry Potter and the Chamber of Secrets",
            description: "The second book in the Harry Potter series.",
            published_date: new Date("1998-07-02"),
          },
        ],
      },
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "George R.R. Martin",
      bio: "American novelist and short story writer, known for A Song of Ice and Fire.",
      birthdate: new Date("1948-09-20"),
      books: {
        create: [
          {
            title: "A Game of Thrones",
            description: "The first book in A Song of Ice and Fire series.",
            published_date: new Date("1996-08-06"),
          },
          {
            title: "A Clash of Kings",
            description: "The second book in A Song of Ice and Fire series.",
            published_date: new Date("1998-11-16"),
          },
        ],
      },
    },
  });

  console.log({ author1, author2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
