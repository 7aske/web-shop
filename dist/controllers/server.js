"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = require("./router");
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config/config"));
var child_process_1 = require("child_process");
mongoose_1.default.Promise = global.Promise;
var PORT = config_1.default.serverPort;
var DB_URL = config_1.default.db.url;
var server = express_1.default();
var mongod = child_process_1.exec("mongod --config " + config_1.default.mongod.conf);
mongoose_1.default
    .connect(DB_URL, { useNewUrlParser: true })
    .then(function () { return console.log("Conected to " + DB_URL); })
    .catch(function () { return console.log("Failed connecting to " + DB_URL); });
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json());
server.use(router_1.router);
server.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
process.on("exit", function () {
    if (mongod)
        mongod.kill();
});
