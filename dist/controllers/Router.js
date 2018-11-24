"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Routes
var root_1 = __importDefault(require("./routes/root"));
var users_1 = __importDefault(require("./routes/users"));
var products_1 = __importDefault(require("./routes/products"));
exports.router = express_1.Router();
exports.router.use("/", root_1.default);
exports.router.use("/users", users_1.default);
exports.router.use("/products", products_1.default);
