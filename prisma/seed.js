"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create authors
        const authors = [
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
                ],
            },
            {
                name: "George R.R. Martin",
                bio: "American novelist and short story writer, known for A Song of Ice and Fire.",
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
                ],
            },
            {
                name: "J.R.R. Tolkien",
                bio: "English writer, poet, philologist, and academic, best known for The Lord of the Rings.",
                birthdate: new Date("1892-01-03"),
                books: [
                    {
                        title: "The Hobbit",
                        description: "A fantasy novel and children's book.",
                        published_date: new Date("1937-09-21"),
                    },
                    {
                        title: "The Fellowship of the Ring",
                        description: "The first of three volumes of the epic novel The Lord of the Rings.",
                        published_date: new Date("1954-07-29"),
                    },
                ],
            },
            {
                name: "Isaac Asimov",
                bio: "American writer and professor of biochemistry, known for his works of science fiction and popular science.",
                birthdate: new Date("1920-01-02"),
                books: [
                    {
                        title: "Foundation",
                        description: "The first novel in the Foundation series.",
                        published_date: new Date("1951-06-01"),
                    },
                    {
                        title: "I, Robot",
                        description: "A collection of science fiction short stories.",
                        published_date: new Date("1950-12-02"),
                    },
                ],
            },
            {
                name: "Arthur C. Clarke",
                bio: "British science fiction writer, futurist, and inventor.",
                birthdate: new Date("1917-12-16"),
                books: [
                    {
                        title: "2001: A Space Odyssey",
                        description: "A science fiction novel.",
                        published_date: new Date("1968-07-01"),
                    },
                    {
                        title: "Rendezvous with Rama",
                        description: "A science fiction novel.",
                        published_date: new Date("1973-06-01"),
                    },
                ],
            },
        ];

        for (const author of authors) {
            yield prisma.author.create({
                data: {
                    name: author.name,
                    bio: author.bio,
                    birthdate: author.birthdate,
                    books: {
                        create: author.books,
                    },
                },
            });
        }

        console.log("Seed data created successfully.");
    });
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
