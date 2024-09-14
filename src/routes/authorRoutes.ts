import { Router } from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  getAuthorDetails,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";
import { validateMiddleware } from "@src/middlewares/validate";
import { authorSchema } from "@src/Utils/joiSchemas";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
//validate req.body with reusable middleware and passing the JOI schema
router.post("/", validateMiddleware(authorSchema), createAuthor);
router.put("/", validateMiddleware(authorSchema), updateAuthor);

router.get("/:id/details", getAuthorDetails);
router.delete("/:id", deleteAuthor);
export default router;
