"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Routes
var root_1 = require("./routes/root");
var users_1 = require("./routes/users");
var products_1 = require("./routes/products");
exports.router = express_1.Router();
exports.router.use("/", root_1.root);
exports.router.use("/users", users_1.users);
exports.router.use("/products", products_1.products);
