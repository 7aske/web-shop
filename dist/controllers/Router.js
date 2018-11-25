"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Routes
var root_1 = __importDefault(require("./routes/root"));
var admin_1 = __importDefault(require("./routes/admin"));
var users_1 = __importDefault(require("./routes/users"));
var orders_1 = __importDefault(require("./routes/orders"));
var products_1 = __importDefault(require("./routes/products"));
var router = express_1.Router();
router.use("/", root_1.default);
router.use("/admin", admin_1.default);
router.use("/users", users_1.default);
router.use("/orders", orders_1.default);
router.use("/products", products_1.default);
exports.default = router;
