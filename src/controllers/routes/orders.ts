import { Router, Request, Response } from "express";
import Order, { orderDefinition } from "../../models/Order";
import Product, { productDefinition } from "../../models/Product";
import User from "../../models/User";
import config from "../../config/config";
import * as jwt from "jsonwebtoken";
import { generate } from "shortid";

const orderRouter = Router();

orderRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hello Orders");
});
orderRouter.post("/", async (req: Request, res: Response) => {
	if (req.user) {
		const oid = generate();
		const products = req.body.products;
		const order: orderDefinition = {
			oid: oid,
			products: products,
			user: req.user.uid
		};
		const newOrder = await new Order(order).save();
		res.redirect("/browse");
	} else {
		res.status(401);
	}
});

orderRouter.get("/:oid", (req: Request, res: Response) => {
	res.status(200).send("Hello Order " + req.params.oid);
});

orderRouter.post("/:oid", (req: Request, res: Response) => {});

export default orderRouter;
