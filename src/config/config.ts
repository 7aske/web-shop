import { SchemaOptions, Schema } from "mongoose";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { generate } from "shortid";
import { execSync, exec } from "child_process";
import { createUser } from "../models/User";
import Admin, { adminDefinition } from "../models/Admin";
import { platform } from "os";
export interface Collections {
	users?: string;
	products?: string;
	orders?: string;
	admin?: string;
	collections?: Collections;
}
export interface Config {
	collections: Collections;
	categories: string[];
	db: { url: string; path: string; uploads: string; defaultProduct: string };
	mongod: { path: string; conf: string };
	serverPort: any;
	hash: { salt: string; rounds: number };
}

let configJSON: Config = JSON.parse(readFileSync(join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));

if (configJSON.db.path.length == 0) configJSON.db.path = join(process.cwd(), "dist/database/database");
if (configJSON.db.url.length == 0) configJSON.db.url = "mongodb://127.0.0.1:27017/database";
if (configJSON.db.uploads.length == 0) configJSON.db.uploads = join(process.cwd(), "dist/database/uploads");
if (configJSON.db.defaultProduct.length == 0)
	configJSON.db.defaultProduct = join(process.cwd(), "dist/config/product.png");
if (configJSON.mongod.path.length == 0)
	configJSON.mongod.path =
		platform() == "win32"
			? execSync("where mongod")
					.toString()
					.split("\r\n")[0]
			: execSync("which mongod")
					.toString()
					.split("\r\n")[0];
if (configJSON.mongod.conf.length == 0) configJSON.mongod.conf = join(process.cwd(), "dist/config/mongod.cfg");
if (isNaN(parseInt(configJSON.serverPort))) configJSON.serverPort = parseInt(process.env.PORT) || 3000;
if (!existsSync(configJSON.db.path)) mkdirSync(configJSON.db.path, { recursive: true });
const config: Config = configJSON;

export default config;
