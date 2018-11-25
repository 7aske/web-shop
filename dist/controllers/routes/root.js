"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var rootRouter = express_1.Router();
rootRouter.get("/", function (req, res) {
    res.render("index.handlebars", {
        title: "Home",
        payload: {
            user: req.user
        }
    });
});
exports.default = rootRouter;
