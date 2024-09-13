// src/app.ts
import express from "express";
import dotenv from "dotenv";
import limiter from "./middlewares/limiter";
import authorRoutes from "./routes/authorRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import bookRoutes from "./routes/bookRoutes";
import { NotFoundError } from "./Utils/Errors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(limiter);

// Define the base path for author routes
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
// Error handling middleware
app.all("*", (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
export default app;
