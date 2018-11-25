import { Router, Request, Response } from "express";
import Product, { productDefinition, createProduct } from "../../models/Product";

const productsRouter = Router();

productsRouter.get("/", (req: Request, res: Response) => {
	res.send("Hello Products");
});

productsRouter.post("/", async (req: Request, res: Response) => {
	const product: productDefinition = {
		name: req.body.name,
		brand: req.body.brand
	};
	const newProduct = await createProduct(new Product(product));
	if (newProduct) {
		res.redirect("/admin/dashboard");
	} else {
		res.status(500).send({ error: "Something went wrong" });
	}
});

productsRouter.get("/:pid", (req: Request, res: Response) => {
	const pid: string = req.params.pid;
	res.send("Hello Products " + pid);
});

export default productsRouter;
