"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
exports.root = express_1.Router();
exports.root.get("/", function (req, res) {
    res.send("Hello ROOT");
});
