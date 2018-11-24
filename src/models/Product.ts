import { Schema, SchemaDefinition } from "mongoose";
import { settings } from "../settings/settings";
import { generate } from "shortid";

const userTemplate: SchemaDefinition = {
	pid: { type: String, default: generate },
	name: { type: String, required: true },
	quantity: { type: Number, default: 0 },
	price: { type: String, default: 0 }
};

export const User = new Schema(userTemplate, settings.collections.products);
