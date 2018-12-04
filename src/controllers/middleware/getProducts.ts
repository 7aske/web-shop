import { Request, Response, NextFunction } from "express";
import Product from "../../models/Product";
export default async (req: Request, res: Response, next: NextFunction) => {
	if (req.admin) {
		const products: any = await Product.find({}).exec();
		req.products = products;
	} else {
		req.products = [];
	}
	next();
};
