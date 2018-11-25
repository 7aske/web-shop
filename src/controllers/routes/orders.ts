import { Router, Request, Response } from "express";
import Product from "../../models/Order";

const orderRouter = Router();

orderRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hello Orders");
});

orderRouter.get("/:oid", (req: Request, res: Response) => {
	res.status(200).send("Hello Order " + req.params.oid);
});

orderRouter.post("/:oid", (req: Request, res: Response) => {
	res.status(200).send("Hello Order " + req.params.oid);
});

export default orderRouter;
