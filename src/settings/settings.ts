import { SchemaOptions } from "mongoose";
export interface Collections {
	users: SchemaOptions;
	products: SchemaOptions;
}
export interface Settings {
	collections: Collections;
}
export const settings: Settings = {
	collections: {
		users: {
			collection: "users"
		},
		products: {
			collection: "prodcuts"
		}
	}
};
