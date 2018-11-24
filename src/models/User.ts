import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { settings } from "../settings/settings";
import { generate } from "shortid";

export interface userDefinition {
	uid: string;
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

const userSchema = new mongoose.Schema(userTemplate, settings.collections.users);

userSchema.methods.comparePasswords = async function(password: string) {
	return this.password == (await bcrypt.hash(password, settings.hash.rounds));
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
