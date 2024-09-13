import { Router } from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
} from "../controllers/authorController";
import { validateMiddleware } from "@src/middlewares/validate";
import { authorSchema } from "@src/Utils/joiSchemas";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", validateMiddleware(authorSchema), createAuthor);

export default router;
