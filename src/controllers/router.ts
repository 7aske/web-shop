import { Router, Request, Response } from "express";

// Routes
import { root } from "./routes/root";
import { users } from "./routes/users";
import { products } from "./routes/products";

export const router = Router();

router.use("/", root);
router.use("/users", users);
router.use("/products", products);
