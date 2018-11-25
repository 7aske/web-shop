import mongoose from "mongoose";
import config from "../config/config";
import { generate } from "shortid";

export interface productDefinition {
	pid: string;
	name: string;
	quantity: number;
	price: string;
}

const productDefinition: mongoose.SchemaDefinition = {
	pid: { type: String, default: generate },
	name: { type: String, required: true },
	quantity: { type: Number, default: 0 },
	price: { type: String, default: 0 }
};

export const productSchema = new mongoose.Schema(productDefinition, config.collections.products);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
