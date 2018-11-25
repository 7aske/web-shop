"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var shortid_1 = require("shortid");
var User_1 = __importDefault(require("./User"));
var Product_1 = __importDefault(require("./Product"));
var config_1 = __importDefault(require("../config/config"));
var orderDefinition = {
    oid: { type: String, default: shortid_1.generate },
    user: { type: User_1.default, required: true },
    products: { type: [Product_1.default], default: [] }
};
var orderSchema = new mongoose_1.default.Schema(orderDefinition, config_1.default.collections.products);
var OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.default = OrderModel;
