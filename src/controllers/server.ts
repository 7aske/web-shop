import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import config from "../config/config";
import { exec } from "child_process";
import { join } from "path";
import morgan from "morgan";
import checkCookie from "./middleware/checkCookie";

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

server.use(express.static(join(process.cwd(), "dist/views")));

server.set("views", join(process.cwd(), "dist/views/layouts"));
server.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: server.get("views") }));
server.set("view engine", "handlebars");

server.use(morgan("dev"));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(checkCookie);
server.use(router);

server.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

process.on("exit", () => {
	if (mongod) mongod.kill();
});
