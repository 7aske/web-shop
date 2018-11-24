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
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
var server = Express.default();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router_1.router);
server.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
