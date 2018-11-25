import mongoose from "mongoose";
import { generate } from "shortid";
import User from "./User";
import Product from "./Product";
import config from "../config/config";

const orderDefinition: mongoose.SchemaDefinition = {
	oid: { type: String, default: generate },
	user: { type: User, required: true },
	products: { type: [Product], default: [] }
};

const orderSchema = new mongoose.Schema(orderDefinition, config.collections.products);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
