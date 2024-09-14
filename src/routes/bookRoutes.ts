import { Router } from "express";

import {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBook1,
  getBookDetails,
} from "../controllers/booksController";
import { validateMiddleware } from "@src/middlewares/validate";
import { bookSchema } from "@src/Utils/joiSchemas";

const router = Router();
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", validateMiddleware(bookSchema), createBook1);
router.delete("/:id", deleteBook);
router.put("/:id", validateMiddleware(bookSchema), updateBook);
router.get("/:id/details", getBookDetails);
export default router;
