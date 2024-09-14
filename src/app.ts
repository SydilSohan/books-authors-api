import express from "express";
import dotenv from "dotenv";
import limiter from "./middlewares/limiter";
import authorRoutes from "./routes/authorRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import bookRoutes from "./routes/bookRoutes";
import { BadRequetError } from "./exceptions/BadRequest";
import { ErrorCodes } from "./exceptions/CustomError";
import { validateParams } from "./middlewares/validateParamId";

dotenv.config();

const app = express();
app.use(express.json());
app.use(limiter);

// Define the base path for author routes
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
// Error handling middleware
app.all("*", (req, res, next) => {
  throw new BadRequetError("Path not found", ErrorCodes.NOT_FOUND);
});
app.use(validateParams);
app.use(errorHandler);
export default app;
