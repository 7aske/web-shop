import mongoose from "mongoose";
import { generate } from "shortid";
import User, { userDefinition } from "./User";
import Product, { productDefinition, productSchema } from "./Product";
import config from "../config/config";

export interface orderDefinition {
	oid: string;
	user: userDefinition;
	products: productDefinition[];
}

const orderDefinition: mongoose.SchemaDefinition = {
	oid: { type: String, default: generate },
	products: { type: [productSchema], default: [] }
};

export const orderSchema = new mongoose.Schema(orderDefinition, config.collections.products);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
