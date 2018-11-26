import mongoose from "mongoose";
import config from "../config/config";

export interface adminDefinition {
	username: string;
	password: string;
	email?: string;
}

const adminDefinition: mongoose.SchemaDefinition = {
	username: { type: String, default: "admin" },
	password: { type: String, required: true },
	email: { type: String }
};

export const adminSchema = new mongoose.Schema(adminDefinition, { collection: config.collections.admin });

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
