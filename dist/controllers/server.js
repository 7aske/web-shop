"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var router_1 = __importDefault(require("./router"));
var config_1 = __importDefault(require("../config/config"));
var child_process_1 = require("child_process");
var path_1 = require("path");
var morgan_1 = __importDefault(require("morgan"));
var checkCookie_1 = __importDefault(require("./middleware/checkCookie"));
var Admin_1 = require("../models/Admin");
mongoose_1.default.Promise = global.Promise;
var PORT = config_1.default.serverPort;
var DB_URL = config_1.default.db.url;
var server = express_1.default();
console.log("mongod --config " + config_1.default.mongod.conf);
var mongod = child_process_1.spawn("mongod", ["--config", config_1.default.mongod.conf]);
mongod.stdout.on("data", function (data) {
    console.log(data.toString());
});
setTimeout(function () {
    mongoose_1.default
        .connect(DB_URL, { useNewUrlParser: true })
        .then(function () { return console.log("Connected to " + DB_URL); })
        .catch(function (err) { return console.log(err); });
}, 2000);
server.use(express_1.default.static(path_1.join(process.cwd(), "dist/views")));
server.set("views", path_1.join(process.cwd(), "dist/views/layouts"));
server.engine("handlebars", express_handlebars_1.default({ defaultLayout: "main", layoutsDir: server.get("views") }));
server.set("view engine", "handlebars");
server.use(morgan_1.default("dev"));
server.use(cookie_parser_1.default());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(checkCookie_1.default);
server.use(router_1.default);
server.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
Admin_1.initAdmin();
process.on("exit", function () {
    if (mongod)
        mongod.kill();
});
