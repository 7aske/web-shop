import express from "express";
import bodyParser from "body-parser";
import router from "./router";
import mongoose from "mongoose";
import config from "../config/config";
import { exec } from "child_process";

mongoose.Promise = global.Promise;

const PORT = config.serverPort;
const DB_URL = config.db.url;

const server = express();

const mongod = exec(`mongod --config ${config.mongod.conf}`);

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

process.on("exit", () => {
	if (mongod) mongod.kill();
});
