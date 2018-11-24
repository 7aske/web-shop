"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router_1 = require("./router");
var mongoose_1 = __importDefault(require("mongoose"));
var settings_1 = require("../settings/settings");
mongoose_1.default.Promise = global.Promise;
var PORT = settings_1.settings.serverPort;
var DB_URL = settings_1.settings.databaseUrl;
var server = express_1.default();
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
