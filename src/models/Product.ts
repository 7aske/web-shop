import mongoose from "mongoose";
import { settings } from "../settings/settings";
import { generate } from "shortid";

export const productDefinition: mongoose.SchemaDefinition = {
	pid: { type: String, default: generate },
	name: { type: String, required: true },
	quantity: { type: Number, default: 0 },
	price: { type: String, default: 0 }
};

const productSchema = new mongoose.Schema(productDefinition, settings.collections.products);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
