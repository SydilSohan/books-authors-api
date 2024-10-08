import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

import { BadRequetError } from "@src/exceptions/BadRequest";
import { ErrorCodes } from "@src/exceptions/CustomError";
import {
  NotFoundError,
  UpdateError,
  ValidationError,
} from "@src/exceptions/ErrorClasses";
import prisma from "@src/utils/prismaClient";

//define possible query params types interface
interface QueryParams {
  author?: string;
  title?: string;
  authorName?: string;
  page?: string;
  size?: string;
}

export const getBooks = async (
  req: Request<QueryParams, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const {
    author: authorQuery,
    title: titleQuery,
    authorName: authorNameQuery,
    page: pageQuery,
    size: sizeQuery,
  } = req.query;

  try {
    const filters: Prisma.BookWhereInput = {};

    if (authorQuery) {
      const authorId = parseInt(authorQuery as string);
      if (isNaN(authorId))
        throw new BadRequetError("Invalid query", ErrorCodes.NOT_FOUND);
      const authorExists = await prisma.author.findUnique({
        where: { id: authorId },
      });
      if (!authorExists) {
        next(
          new ValidationError([
            { field: "author", message: "authorId does not exist" },
          ])
        );
      }
      filters.authorId = authorId;
    }

    if (titleQuery && typeof titleQuery === "string") {
      filters.title = {
        contains: titleQuery,
        mode: "insensitive",
      };
    }

    if (authorNameQuery && typeof authorNameQuery === "string") {
      const authors = await prisma.author.findMany({
        where: {
          name: {
            contains: authorNameQuery,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      if (authors.length === 0) {
        return next(
          new ValidationError([
            {
              field: "authorName",
              message: "No authors found with the given name",
            },
          ])
        );
      }

      filters.authorId = {
        in: authors.map((author) => author.id),
      };
    }
    // pagination,defaults to first page and 10 size if no query params provided
    const page = parseInt(pageQuery as string) || 1;
    const size = parseInt(sizeQuery as string) || 10;
    const skip = (page - 1) * size;
    const take = size;

    const books = await prisma.book.findMany({
      where: filters,
      skip,
      take,
    });

    successResponse(res, books, "Books retrieved successfully");
  } catch (error) {
    console.error(error);
    next(new UpdateError());
  }
};

export const getBookById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) throw new NotFoundError();
    successResponse(res, book);
  } catch (error) {
    next(new NotFoundError());
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.book.delete({
      where: { id },
    });
    successResponse(res, null, "Book deleted successfully");
  } catch (error) {
    next(new NotFoundError());
  }
};
interface ID {
  id: string; // `req.params.id` will be a string from the URL
}

export const updateBook = async (
  req: Request<any, {}, Prisma.BookUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return next(
      new ValidationError([{ field: "id", message: "id must be a number" }])
    );
  }
  const { author: authorID, description, published_date, title } = req.body;

  if (authorID && typeof authorID !== "number") {
    return next(
      new ValidationError([
        { field: "author", message: "author must be a number" },
      ])
    );
  }

  try {
    const data: Prisma.BookUpdateInput = {
      title,
      description,
      published_date,
    };

    if (authorID) {
      data.author = {
        connect: { id: authorID },
      };
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data,
    });
    successResponse(res, updatedBook, "Book updated successfully");
  } catch (error) {
    console.log(error);
    next(new UpdateError());
  }
};

export const createBook1 = async (
  req: Request<{}, {}, Prisma.BookCreateInput>,
  res: Response,
  next: NextFunction
) => {
  const { author: authorID, published_date, title, description } = req.body;

  if (authorID) {
    if (typeof authorID !== "number") {
      return next(
        new ValidationError([
          { field: "author", message: "author must be a number" },
        ])
      );
    }
    const authorExists = await prisma.author.findUnique({
      where: { id: authorID },
    });
    if (!authorExists) {
      return next(
        new ValidationError([
          { field: "author", message: "authorId does not exist" },
        ])
      );
    }
  }

  try {
    const data: Prisma.BookCreateInput = {
      title,
      description,
      published_date,
      author: {
        connect: { id: authorID },
      },
    };

    const updatedBook = await prisma.book.create({
      data,
    });
    successResponse(res, updatedBook, "Book updated successfully");
  } catch (error) {
    console.log(error);
    next(new UpdateError());
  }
};

export const getBookDetails = async (
  req: Request<ID, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if (!book) {
      return next(new NotFoundError());
    }
    successResponse(res, book, "Book details retrieved successfully");
  } catch (error) {
    console.error(error);
    next(new UpdateError());
  }
};

export const successResponse = (
  res: Response,
  data: any,
  message = "Success"
) => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};
