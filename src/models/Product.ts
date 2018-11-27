import mongoose from "mongoose";
import config from "../config/config";
import { generate } from "shortid";

export interface productDefinition {
	pid?: string;
	brand: string;
	name: string;
	quantity?: number;
	price?: number;
	category?: string;
	img?: string;
}
const productDefinition: mongoose.SchemaDefinition = {
	pid: { type: String, default: generate },
	name: { type: String, required: true },
	brand: { type: String, required: true },
	quantity: { type: Number, default: 0 },
	price: { type: Number, default: 0 },
	category: { type: String, required: false },
	img: { type: String }
};

export const productSchema = new mongoose.Schema(productDefinition, { collection: config.collections.products });

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;

export async function createProduct(product: any): Promise<mongoose.Document> {
	product.pid = generate();
	return await product.save();
}
