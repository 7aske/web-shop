import mongoose from "mongoose";
import config from "../config/config";
import { generate } from "shortid";
import { createUser } from "../models/User";

export interface adminDefinition {
	aid?: string;
	username: string;
	password: string;
	email?: string;
}

const adminDefinition: mongoose.SchemaDefinition = {
	aid: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String }
};

export const adminSchema = new mongoose.Schema(adminDefinition, { collection: config.collections.admin, capped: 1 });

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;

export async function initAdmin() {
	if ((await AdminModel.find({}).exec()).length == 0) {
		const admin: adminDefinition = {
			aid: generate(),
			username: "admin",
			password: "taske"
		};
		const newAdmin = await createUser(new AdminModel(admin));
	}
}
