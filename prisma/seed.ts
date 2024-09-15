import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create authors and books
  const authorsData = [
    {
      name: "J.K. Rowling",
      bio: "British author, best known for the Harry Potter series.",
      birthdate: new Date("1965-07-31"),
      books: [
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
        // Add more books for J.K. Rowling if needed
      ],
    },
    {
      name: "George R.R. Martin",
      bio: "American novelist and short story writer, best known for A Song of Ice and Fire.",
      birthdate: new Date("1948-09-20"),
      books: [
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
        // Add more books for George R.R. Martin if needed
      ],
    },
    // Add more authors with books to ensure at least 20 records
  ];

  // Generate additional authors and books for pagination
  for (let i = 3; i <= 10; i++) {
    authorsData.push({
      name: `Author ${i}`,
      bio: `Bio for Author ${i}`,
      birthdate: new Date(`1970-01-01`),
      books: Array.from({ length: 2 }, (_, j) => ({
        title: `Book ${i}-${j + 1}`,
        description: `Description for Book ${i}-${j + 1}`,
        published_date: new Date(`2000-01-01`),
      })),
    });
  }

  // Create authors and books in the database
  for (const authorData of authorsData) {
    await prisma.author.create({
      data: {
        name: authorData.name,
        bio: authorData.bio,
        birthdate: authorData.birthdate,
        books: {
          create: authorData.books,
        },
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
