import { Router, Request, Response } from "express";

// Routes
import rootRouter from "./routes/root";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";

export const router = Router();

router.use("/", rootRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
