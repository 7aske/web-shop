import * as Express from "express";
import * as bodyParser from "body-parser";
import { router } from "./router";
import * as mongoose from "mongoose";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server: Express.Application = Express.default();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router);

server.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});
