import { Express } from "express";
import { userDefinition } from "../models/User";

declare module "express" {
	export interface Request {
		user?: userDefinition;
	}
}
