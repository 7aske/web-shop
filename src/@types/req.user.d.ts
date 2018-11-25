import { Express } from "express";
import { userDefinition } from "../models/User";
import { productDefinition } from "../models/Product";

declare module "express" {
	export interface Request {
		user?: userDefinition;
		users?: userDefinition[];
		errors?: String[];
		products?: productDefinition[];
	}
}
