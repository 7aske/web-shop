import mongoose, { Document } from "mongoose";
import { createHmac } from "crypto";
import config from "../config/config";
import { generate } from "shortid";
import Order, { orderDefinition, orderSchema } from "./Order";

export interface userDefinition {
	uid?: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
	orders?: orderDefinition[];
	[key: string]: string | orderDefinition[] | undefined;
}

const userTemplate: mongoose.SchemaDefinition = {
	uid: { type: String, default: generate },
	username: { type: String, required: true },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	orders: { type: [orderSchema], default: [] }
};

export const userSchema = new mongoose.Schema(userTemplate, config.collections.users);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

export async function createUser(user: any): Promise<Document> {
	user.uid = generate();
	user.password = createHmac("sha256", config.hash.salt)
		.update(user.password)
		.digest("hex");
	return await user.save();
}

export function comparePasswords(hashed: string, notHashed: string): boolean {
	return (
		hashed ==
		createHmac("sha256", config.hash.salt)
			.update(notHashed)
			.digest("hex")
	);
}
