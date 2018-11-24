import { Schema, SchemaDefinition, Model } from "mongoose";
import * as bcrypt from "bcrypt";
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

const userSchema = new Schema(userTemplate, settings.collections.users);

userSchema.methods.comparePasswords = async function(password: string) {
	return this.password == (await bcrypt.hash(password, "salt"));
};

export const User = new Model(userSchema);
