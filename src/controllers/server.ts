import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import config from "../config/config";
import { spawn } from "child_process";
import { join } from "path";
import morgan from "morgan";
import checkCookie from "./middleware/checkCookie";
import { initAdmin } from "../models/Admin";

mongoose.Promise = global.Promise;

const PORT = config.serverPort;
const DB_URL = config.db.url;

const server = express();

console.log(`mongod --config ${config.mongod.conf}`);

const mongod = spawn("mongod", ["--config", config.mongod.conf]);
mongod.stdout.on("data", function (data) {
	console.log(data.toString());
});
setTimeout(() => {
	mongoose
		.connect(
			DB_URL,
			{useNewUrlParser: true}
		)
		.then(() => console.log("Connected to " + DB_URL))
		.catch((err) => console.log(err));
}, 2000);


server.use(express.static(join(process.cwd(), "dist/views")));

server.set("views", join(process.cwd(), "dist/views/layouts"));
server.engine("handlebars", exphbs({defaultLayout: "main", layoutsDir: server.get("views")}));
server.set("view engine", "handlebars");

server.use(morgan("dev"));
server.use(cookieParser());
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(checkCookie);
server.use(router);

server.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

initAdmin();

process.on("exit", () => {
	if (mongod) mongod.kill();
});
