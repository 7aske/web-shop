"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var os_1 = require("os");
var configJSON = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), "dist/config/config.json"), { encoding: "utf8" }));
if (configJSON.db.path.length == 0)
    configJSON.db.path = path_1.join(process.cwd(), "dist/database/database");
if (configJSON.db.url.length == 0)
    configJSON.db.url = "mongodb://127.0.0.1:27017/database";
if (configJSON.db.uploads.length == 0)
    configJSON.db.uploads = path_1.join(process.cwd(), "dist/database/uploads");
if (configJSON.db.defaultProduct.length == 0)
    configJSON.db.defaultProduct = path_1.join(process.cwd(), "dist/config/product.png");
if (configJSON.mongod.path.length == 0)
    configJSON.mongod.path =
        os_1.platform() == "win32"
            ? child_process_1.execSync("where mongod")
                .toString()
                .split("\r\n")[0]
            : child_process_1.execSync("which mongod")
                .toString()
                .split("\r\n")[0];
if (configJSON.mongod.conf.length == 0)
    configJSON.mongod.conf = path_1.join(process.cwd(), "dist/config/mongod.cfg");
if (isNaN(parseInt(configJSON.serverPort)))
    configJSON.serverPort = parseInt(process.env.PORT) || 3000;
if (!fs_1.existsSync(configJSON.db.path))
    fs_1.mkdirSync(configJSON.db.path, { recursive: true });
var config = configJSON;
exports.default = config;
