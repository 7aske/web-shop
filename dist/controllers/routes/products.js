"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productsRouter = express_1.Router();
productsRouter.get("/", function (req, res) {
    res.send("Hello Products");
});
productsRouter.get("/:pid", function (req, res) {
    var pid = req.params.pid;
    res.send("Hello Products " + pid);
});
exports.default = productsRouter;
