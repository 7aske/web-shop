"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.products = express_1.Router();
exports.products.get("/", function (req, res) {
    res.send("Hello Products");
});
exports.products.get("/:pid", function (req, res) {
    var pid = req.params.pid;
    res.send("Hello Products " + pid);
});
