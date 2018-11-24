import { SchemaOptions } from "mongoose";
export interface Collections {
	users: SchemaOptions;
	products: SchemaOptions;
}
export interface Settings {
	collections: Collections;
	databaseUrl: string;
	serverPort: number;
	hash: { salt: string; rounds: number };
}
export const settings: Settings = {
	collections: {
		users: {
			collection: "users"
		},
		products: {
			collection: "prodcuts"
		}
	},
	databaseUrl: "mongodb://127.0.0.1:27017/database",
	serverPort: process.env.PORT ? parseInt(process.env.PORT) : 3000,
	hash: {
		salt: "saltystring",
		rounds: 10
	}
};
