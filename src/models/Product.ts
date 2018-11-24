import { Schema, SchemaDefinition, Model } from "mongoose";
import { settings } from "../settings/settings";
import { generate } from "shortid";

const productDefinition: SchemaDefinition = {
	pid: { type: String, default: generate },
	name: { type: String, required: true },
	quantity: { type: Number, default: 0 },
	price: { type: String, default: 0 }
};

const productSchema = new Schema(productDefinition, settings.collections.products);

export const User = new Model(productSchema);
