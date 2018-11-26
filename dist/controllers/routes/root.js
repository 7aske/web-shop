"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = __importDefault(require("../../config/config"));
var rootRouter = express_1.Router();
rootRouter.get("/browse", function (req, res) {
    res.render("browse.handlebars", {
        title: "Home",
        payload: {
            user: req.user,
            categories: config_1.default.categories
        }
    });
});
rootRouter.get("/", function (req, res) {
    res.render("index.handlebars", {
        title: "Home",
        payload: {
            user: req.user
        }
    });
});
exports.default = rootRouter;
