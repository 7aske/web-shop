"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express = __importStar(require("express"));
var bodyParser = __importStar(require("body-parser"));
var router_1 = require("./router");
var mongoose_1 = require("mongoose");
var settings_1 = require("../settings/settings");
var PORT = settings_1.settings.serverPort;
var DB_URL = settings_1.settings.databaseUrl;
var server = Express.default();
var conn = new mongoose_1.Mongoose()
    .connect(DB_URL)
    .then(function () { return console.log("Conected to " + DB_URL); })
    .catch(function () { return console.log("Failed connecting to " + DB_URL); });
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router_1.router);
server.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
