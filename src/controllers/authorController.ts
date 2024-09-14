//handle all authors endpoints
import { Request, Response, NextFunction } from "express";
import prisma from "@src/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { successResponse } from "@src/Utils/response";
import {
  NotFoundError,
  UpdateError,
  ValidationError,
} from "@src/exceptions/Errors";
import { BadRequetError } from "@src/exceptions/BadRequest";
import { CustomError, ErrorCodes } from "@src/exceptions/CustomError";

type QueryParams = {
  name?: string;
  page?: string;
  size?: string;
  id?: string;
};
//

export const deleteAuthor = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.author.delete({
      where: { id },
    });
    successResponse(res, null, "Author deleted successfully");
  } catch (error) {
    next(new NotFoundError());
  }
};
export const getAuthors = async (
  req: Request<QueryParams, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const {
    name: nameQuery,
    page: pageQuery,
    size: sizeQuery,
    id: idQuery,
  } = req.query;

  try {
    const filters: Prisma.AuthorWhereInput = {};
    if (idQuery && typeof idQuery === "string") {
      filters.id = parseInt(idQuery);
    }
    if (nameQuery && typeof nameQuery === "string") {
      filters.name = {
        contains: nameQuery,
        mode: "insensitive",
      };
    }
    //simple pagination defaults to first page and 10 size if params not provided
    const page = parseInt(pageQuery as string) || 1;
    const size = parseInt(sizeQuery as string) || 10;
    const skip = (page - 1) * size;
    const take = size;

    const authors = await prisma.author.findMany({
      where: filters,
      skip,
      take,
    });

    successResponse(res, authors, "Authors retrieved successfully");
  } catch (error) {
    console.error(error);
    next(new UpdateError());
  }
};
export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const author = await prisma.author.findUnique({
      where: { id },
    });
    if (!author) {
      return next(new NotFoundError());
    }
    successResponse(res, author);
  } catch (error) {
    next(new UpdateError());
  }
};
//create author after successfuly middleware validation of inputs
export const createAuthor = async (
  req: Request<{}, {}, Prisma.AuthorCreateInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, bio, birthdate } = req.body;
  try {
    const newAuthor = await prisma.author.create({
      data: { name, bio, birthdate },
    });
    successResponse(res, newAuthor, "Author created successfully");
  } catch (error) {
    console.log(error);
    next(new UpdateError());
  }
};
//handle author detailed view with books
export const getAuthorDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });
    if (!author) {
      throw new BadRequetError("Author not found", ErrorCodes.NOT_FOUND);
    }
    successResponse(res, author, "Author details retrieved successfully");
  } catch (error) {
    console.error(error);
  }
};
export const updateAuthor = async (
  req: Request<{ id: string }, {}, Prisma.AuthorUpdateInput>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        ...req.body,
      },
    });
    successResponse(res, updatedAuthor, "Book updated successfully");
  } catch (error) {
    next(new UpdateError());
  }
};
