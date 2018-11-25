import { SchemaOptions } from "mongoose";
import { readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export interface Collections {
	users: SchemaOptions;
	products: SchemaOptions;
}
export interface Config {
	collections: Collections;
	db: { url: string; path: string };
	mongod: { path: string; conf: string };
	serverPort: number;
	hash: { salt: string; rounds: number };
}

let configJSON: Config = JSON.parse(readFileSync(join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));

if (configJSON.db.path.length == 0) configJSON.db.path = join(process.cwd(), "dist/database/db");
if (configJSON.db.url.length == 0) configJSON.db.url = "mongodb://127.0.0.1:27017/database";
if (configJSON.mongod.path.length == 0)
	configJSON.mongod.path = execSync("where mongod")
		.toString()
		.split("\r\n")[0];
if (configJSON.mongod.conf.length == 0) configJSON.mongod.conf = join(process.cwd(), "dist/config/mongod.cfg");
if (isNaN(configJSON.serverPort)) configJSON.serverPort = 3000;
if (!existsSync(configJSON.db.path)) mkdirSync(configJSON.db.path, { recursive: true });
const config: Config = configJSON;

export default config;
