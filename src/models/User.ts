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
	confirm?: string;
	orders?: orderDefinition[];
	[key: string]: string | orderDefinition[] | undefined;
}

export interface registrationErrors {
	username?: string[];
	email?: string[];
	firstName?: string[];
	lastName?: string[];
	password?: string[];
	[key: string]: string[];
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

export const userSchema = new mongoose.Schema(userTemplate, { collection: config.collections.users });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

export async function createUser(user: any): Promise<mongoose.Document> {
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
export async function validate(user: userDefinition) {
	const onlyAlphanumeric = new RegExp(/^[^.-][a-zA-z0-9.-]+[^.-]$/);
	const onlyCharacters = new RegExp(/^[a-zA-Z]+$/);
	const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

	let regErrors: registrationErrors = {
		username: [],
		password: [],
		email: [],
		firstName: [],
		lastName: []
	};

	if (await UserModel.findOne({ username: user.username }).exec()) regErrors.username.push("Username taken.");
	if (user.username.length < 5) regErrors.username.push("Minimum 5 characters.");
	if (!onlyAlphanumeric.test(user.username)) regErrors.username.push("Only alphanumeric characters.");
	if (user.password.length < 4) regErrors.password.push("Minimum 4 characters.");
	if (user.password != user.confirm) regErrors.password.push("Passwords don't match.");
	if (await UserModel.findOne({ email: user.email }).exec()) regErrors.email.push("Email taken.");
	if (user.email.length == 0) regErrors.email.push("Email required.");
	if (!email.test(user.email)) regErrors.email.push("Invalid email.");
	if (user.firstName.length == 0) regErrors.firstName.push("First name required.");
	if (!onlyCharacters.test(user.firstName)) regErrors.firstName.push("Only characters.");
	if (user.lastName.length == 0) regErrors.lastName.push("Last name required.");
	if (!onlyCharacters.test(user.lastName)) regErrors.lastName.push("Only characters.");

	let check = false;
	Object.keys(regErrors).forEach(e => {
		if (regErrors[e].length > 0) check = true;
	});

	if (check) return regErrors;
	else return null;
}
