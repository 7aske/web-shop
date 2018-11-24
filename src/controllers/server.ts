import * as express from "express";
import * as bodyParser from "body-parser";
import { router } from "./router";
import { Mongoose } from "mongoose";
import { settings } from "../settings/settings";

const PORT = settings.serverPort;
const DB_URL = settings.databaseUrl;

const server = express.default();
const mongoose = new Mongoose();

mongoose
	.connect(
		DB_URL,
		{ useNewUrlParser: true }
	)
	.then(() => console.log("Conected to " + DB_URL))
	.catch(() => console.log("Failed connecting to " + DB_URL));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router);

server.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});
