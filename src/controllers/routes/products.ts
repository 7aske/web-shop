import { Router, Request, Response, NextFunction } from "express";
import Product, { productDefinition, createProduct } from "../../models/Product";
import checkCookie from "../middleware/checkCookie";
import config from "../../config/config";
const productsRouter = Router();

productsRouter.get("/query", checkCookie, async (req: Request, res: Response) => {
	const query = new RegExp(req.query.s, "gi");
	if (req.user) {
		const products = await Product.find({
			$and: [{ category: req.query.c }, { $or: [{ name: query }, { brand: query }] }]
		}).exec();
		console.log(products);

		res.status(200).send({ products: products });
	} else {
		res.status(403).send({ error: "Unauthorized." });
	}
});

productsRouter.post(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		const category = config.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
		const product: productDefinition = {
			name: req.body.name,
			brand: req.body.brand,
			price: parseInt(req.body.price),
			quantity: parseInt(req.body.quantity),
			category: category
		};
		try {
			const newProduct = await createProduct(new Product(product));
		} catch (err) {
			//TODO: error middelware
			const errors = Object.keys(err.errors).map(error => (error = err.errors[error]["message"]));
			req.errors = errors;
		}
		next();
	},
	(req: Request, res: Response) => {
		res.redirect("/admin/dashboard");
	}
);

productsRouter.post("/:pid", async (req: Request, res: Response) => {
	const category = config.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
	const newProduct: productDefinition = {
		name: req.body.name,
		brand: req.body.brand,
		price: parseInt(req.body.price),
		quantity: parseInt(req.body.quantity),
		category: category
	};
	const product = Product.findOneAndUpdate({ pid: req.body.pid }, newProduct).exec();
	if (product) {
		res.redirect("/admin/dashboard");
	} else {
		res.redirect("/admin/dashboard");
	}
});

export default productsRouter;
