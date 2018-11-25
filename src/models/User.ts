import mongoose from "mongoose";
import { createHmac } from "crypto";
import config from "../config/config";
import { generate } from "shortid";

export interface userDefinition {
	uid?: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

const userTemplate: mongoose.SchemaDefinition = {
	uid: { type: String, default: generate },
	username: { type: String, required: true },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true }
};

const userSchema = new mongoose.Schema(userTemplate, config.collections.users);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

export async function createUser(user: any) {
	user.uid = generate();
	user.password = createHmac("sha256", config.hash.salt)
		.update(user.password)
		.digest("hex");
	return await user.save();
}

export function comparePasswords(user: any, notHashed: string): boolean {
	return (
		user.password ==
		createHmac("sha256", config.hash.salt)
			.update(notHashed)
			.digest("hex")
	);
}
