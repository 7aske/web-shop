"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var rootRouter = express_1.Router();
rootRouter.get("/", function (req, res) {
    res.send("Hello ROOT");
});
exports.default = rootRouter;
