import { Schema, SchemaDefinition } from "mongoose";
import { settings } from "../settings/settings";
import { generate } from "shortid";

const userTemplate: SchemaDefinition = {
	uid: { type: String, default: generate },
	username: { type: String, required: true },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true }
};

export const User = new Schema(userTemplate, settings.collections.users);
