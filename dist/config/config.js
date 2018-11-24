"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var configJSON = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));
if (configJSON.databasePath.length == 0)
    configJSON.databasePath = path_1.join(process.cwd(), "dist/database");
if (configJSON.databaseUrl.length == 0)
    configJSON.databaseUrl = "mongodb://127.0.0.1:27017/database";
if (configJSON.mongodPath.length == 0)
    configJSON.mongodPath = child_process_1.execSync("where mongod")
        .toString()
        .split("\r\n")[0];
if (configJSON.mongodConfPath.length == 0)
    configJSON.mongodConfPath = path_1.join(process.cwd(), "dist/config/mongod.cfg");
if (isNaN(configJSON.serverPort))
    configJSON.serverPort = 3000;
var config = configJSON;
exports.default = config;
