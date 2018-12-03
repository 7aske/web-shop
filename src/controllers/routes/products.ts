import { Router, Request, Response, NextFunction } from "express";
import Product, { productDefinition, createProduct } from "../../models/Product";
import checkCookie from "../middleware/checkCookie";
import * as jwt from "jsonwebtoken";
import { generate } from "shortid";
import { writeFileSync, mkdirSync, writeFile, existsSync, readFileSync } from "fs";
import { join } from "path";
import config from "../../config/config";
const productsRouter = Router();

import multer from "multer";
const upload = multer();
//const upload = multer({ dest: "./dist/database/uploads" });

interface Cart {
	products: string[];
}
productsRouter.get("/query/:pid", async (req: Request, res: Response) => {
	if (req.user) {
		const product = await Product.findOne({
			pid: req.params.pid
		}).exec();
		res.status(200).send({ product: product });
	} else {
		res.status(401).send({ error: "Unauthorized." });
	}
});

productsRouter.get("/query", checkCookie, async (req: Request, res: Response) => {
	const query = new RegExp(req.query.s, "gi");
	// if (req.user) {
	const products = await Product.find({
		$and: [{ category: req.query.c }, { $or: [{ name: query }, { brand: query }] }]
	}).exec();
	res.status(200).send({ products: products });
	// } else {
	// res.status(401).send({ error: "Unauthorized." });
	// }
});

productsRouter.post("/cart/:pid", (req: Request, res: Response) => {});

productsRouter.post("/:pid", upload.single("image"), async (req: Request, res: Response) => {
	const folderPath = join(config.db.uploads, req.params.pid);
	const filePath = join(folderPath, "thumbnail.png");
	let imgBuffer: Buffer;
	let imgString: string;
	if (req.file) {
		imgBuffer = req.file.buffer;
	} else {
		imgBuffer = readFileSync(config.db.defaultProduct);
	}
	imgString = imgBuffer.toString("base64");
	if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });
	writeFile(filePath, imgBuffer, () => {});
	const category = config.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
	const newProduct: productDefinition = {
		name: req.body.name,
		brand: req.body.brand,
		price: parseInt(req.body.price),
		quantity: parseInt(req.body.quantity),
		category: category,
		img: imgString
	};
	const product = Product.findOneAndUpdate({ pid: req.body.pid }, newProduct).exec();
	if (product) {
		res.redirect("/admin/dashboard");
	} else {
		res.redirect("/admin/dashboard");
	}
});
productsRouter.post(
	"/",
	upload.single("image"),
	async (req: Request, res: Response, next: NextFunction) => {
		const pid = generate();
		const folderPath = join(config.db.uploads, pid);
		const filePath = join(folderPath, "thumbnail.png");
		let imgBuffer: Buffer;
		let imgString: string;
		if (req.file) {
			imgBuffer = req.file.buffer;
		} else {
			imgBuffer = readFileSync(config.db.defaultProduct);
		}
		imgString = imgBuffer.toString("base64");
		if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });
		writeFile(filePath, imgBuffer, () => {});
		const category = config.categories.indexOf(req.body.category) != -1 ? req.body.category : "none";
		const product: productDefinition = {
			pid: pid,
			name: req.body.name,
			brand: req.body.brand,
			price: parseInt(req.body.price),
			quantity: parseInt(req.body.quantity),
			category: category,
			img: imgString
		};
		try {
			const newProduct = await new Product(product).save();
		} catch (err) {
			const errors = Object.keys(err.errors).map(error => (error = err.errors[error]["message"]));
			req.errors = errors;
		}
		next();
	},
	(req: Request, res: Response) => {
		res.redirect("/admin/dashboard");
	}
);
export default productsRouter;
