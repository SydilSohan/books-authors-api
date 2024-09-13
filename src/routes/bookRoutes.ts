// implement following endpoints for books:
// id (primary key, auto-increment)
// title (string, required)
// description (text, optional)
// published_date (date, required)
// author_id (foreign key, references authors.id, required)
import { Router } from "express";

import {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBook1,
} from "../controllers/booksController";
import { validateMiddleware } from "@src/middlewares/validate";
import { bookSchema } from "@src/Utils/joiSchemas";

const router = Router();
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", validateMiddleware(bookSchema), createBook1);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);
export default router;
