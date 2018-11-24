import express from "express";
import bodyParser from "body-parser";
import { router } from "./router";
import mongoose from "mongoose";
import config from "../config/config";
import { spawn } from "child_process";

mongoose.Promise = global.Promise;

const PORT = config.serverPort;
const DB_URL = config.databaseUrl;

const server = express();

const mongodb = spawn("mongod", [`--dbpath="${config.databasePath}"`, "--bind_ip", "127.0.0.1"]);

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
