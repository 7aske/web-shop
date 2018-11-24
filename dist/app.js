"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./controllers/Server");
var Router_1 = require("./controllers/Router");
var server = new Server_1.Server(3000);
var rootRouter = new Router_1.Router("get", "/", function (req, res) {
    res.send("Hello World");
});
server.start();
server.setRoute(rootRouter.getInstance());
