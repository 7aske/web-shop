import { SchemaOptions } from "mongoose";
import { readFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

export interface Collections {
	users: SchemaOptions;
	products: SchemaOptions;
}
export interface Config {
	collections: Collections;
	databaseUrl: string;
	databasePath: string;
	mongodPath: string;
	mongodConfPath: string;
	serverPort: number;
	hash: { salt: string; rounds: number };
}
let configJSON: Config = JSON.parse(readFileSync(join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));

if (configJSON.databasePath.length == 0) configJSON.databasePath = join(process.cwd(), "dist/database");
if (configJSON.databaseUrl.length == 0) configJSON.databaseUrl = "mongodb://127.0.0.1:27017/database";
if (configJSON.mongodPath.length == 0)
	configJSON.mongodPath = execSync("where mongod")
		.toString()
		.split("\r\n")[0];
if (configJSON.mongodConfPath.length == 0) configJSON.mongodConfPath = join(process.cwd(), "dist/config/mongod.cfg");
if (isNaN(configJSON.serverPort)) configJSON.serverPort = 3000;

const config: Config = configJSON;

export default config;
