"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orderRouter = express_1.Router();
orderRouter.get("/", function (req, res) {
    res.status(200).send("Hello Orders");
});
orderRouter.get("/:oid", function (req, res) {
    res.status(200).send("Hello Order " + req.params.oid);
});
orderRouter.post("/:oid", function (req, res) {
    res.status(200).send("Hello Order " + req.params.oid);
});
exports.default = orderRouter;
