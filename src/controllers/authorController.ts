// src/controllers/authorController.ts
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../Utils/response";
import { NotFoundError, UpdateError } from "@src/Utils/Errors";
import prisma from "@src/prisma/prismaClient";
import { Prisma } from "@prisma/client";

type QueryParams = {
  name?: string;
  page?: string;
  size?: string;
  id?: string;
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
