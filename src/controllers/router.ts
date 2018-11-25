import { Router, Request, Response } from "express";

// Routes
import rootRouter from "./routes/root";
import adminRouter from "./routes/admin";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";

const router = Router();

router.use("/", rootRouter);
router.use("/admin", adminRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);

export default router;
