"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var configJSON = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));
if (configJSON.databasePath.length == 0)
    configJSON.databasePath = path_1.join(process.cwd(), "dist/database");
if (configJSON.databaseUrl.length == 0)
    configJSON.databaseUrl = "mongodb://127.0.0.1:27017/database";
if (configJSON.mongodPath.length == 0)
    configJSON.mongodPath = "C:\\Program Files\\MongoDB\\Server\\4.0\\bin\\mongod.exe";
if (isNaN(configJSON.serverPort))
    configJSON.serverPort = 3000;
console.log(configJSON);
var config = configJSON;
exports.default = config;
