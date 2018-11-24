import express from "express";
import bodyParser from "body-parser";
import { router } from "./router";
import mongoose from "mongoose";
import { settings } from "../settings/settings";

mongoose.Promise = global.Promise;

const PORT = settings.serverPort;
const DB_URL = settings.databaseUrl;

const server = express();

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
